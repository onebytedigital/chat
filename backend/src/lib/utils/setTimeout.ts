import { NextFunction, Request, Response } from 'express';

export const setTimeout = (req: Request, res: Response, next: NextFunction) => {
  res.setTimeout(2147483647, () => {
    res.status(408).json({
      status: 408,
      message: 'A requisição excedeu o tempo limite de 5 minutos',
    });
  });

  next();
};
