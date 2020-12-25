import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import usersView from '../views/usersView';

import * as Yup from 'yup';

import User from '../models/Users';

export default {

  async index (request: Request, response: Response) {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return response.json(usersView.renderMany(users));
  },

  async show (request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOneOrFail(id, );

    return response.json(usersView.render(user));

  },

  async create(request: Request, response: Response) {
    const { 
      name,
      email,
      password_hash,
     } = request.body;
     
     const usersRepository = getRepository(User);

     const userExists = await usersRepository.findOne({ where: { email: request.body.email } });

     if (userExists) {
       return response.status(400).json({ error: 'Este e-mail já foi utilizado' });
     }

     const data = {
        name,
        email,
        password_hash,
     };

     const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().required().min(6),
     });

     await schema.validate(data, {
       abortEarly: false,
     });
  
     const user = usersRepository.create(data);
  
     await usersRepository.save(user);
  
    return response.status(201).json(user);
  }
}