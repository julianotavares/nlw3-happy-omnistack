import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/auth';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Rota não autorizada!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded  = await promisify(jwt.verify)(token, authConfig.secret);

    const { id } = decoded as TokenPayload;

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};