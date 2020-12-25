import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';
import User from '../models/Users';
import authConfig from '../config/auth';

export default{

  async store(req: Request, res: Response) {

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Opa :(  Você inseriu alguma informação errada.' });
    }

    const { email, password } = req.body;

    const usersRepository = getRepository(User);

     const user = await usersRepository.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}