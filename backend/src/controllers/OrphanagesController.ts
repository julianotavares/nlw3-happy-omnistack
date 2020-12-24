import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
	async index(request: Request, response: Response) {
		const orphanagesRepository = getRepository(Orphanage);

		const orphanage = await orphanagesRepository.find({
			relations: ['images'],
		});

		return response.status(200).json(orphanageView.renderMany(orphanage));
	},

	async show(request: Request, response: Response) {
		const { id } = request.params;

		const orphanagesRepository = getRepository(Orphanage);

		const orphanage = await orphanagesRepository.findOneOrFail({ 
			where: { id },
			relations: ['images'],
		});

		if (!orphanage) {
			return response.status(400).json({ error: 'Orphanage does not exists!' });
		}

		return response.status(200).json(orphanageView.render(orphanage));
	},

	async create(request: Request, response: Response) {


		const {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			opening_on_weekends,
		} = request.body;

		const orphanagesRepository = getRepository(Orphanage);

		const requestImages = request.files as Express.Multer.File[];

		const images = requestImages.map(image => {
			return { path: image.filename };
		});

		const data = {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			opening_on_weekends: opening_on_weekends === 'true',
			images,
		};

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			about: Yup.string().required().max(300),
			instructions: Yup.string().required(),
			opening_hours: Yup.string().required(),
			opening_on_weekends: Yup.boolean().required(),
			images: Yup.array(Yup.object().shape({
				path: Yup.string().required(),
			}))
		});

		await schema.validate(data, {
			abortEarly: false,
		});

		const orphanage = await orphanagesRepository.create(data);

		await orphanagesRepository.save(orphanage);

		response.status(201).json(orphanage);
	}
}