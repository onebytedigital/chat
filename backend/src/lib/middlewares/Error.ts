import axios, { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.response?.status || 500;

  console.log('errooooooooooooooooooor');
  let error: any;
  if (axios.isAxiosError(err)) {
    const { data }: any = err.response;
    error = {
      name: err.name,
      message: err.message,
      url: err?.config?.url,
      stack: err.stack,
      errors: { ...data },
    };
  } else {
    const msg = err.message;
    error = {
      name: err.name,
      message: msg,
      stack: err.stack,
    };
  }

  if (err?.name === 'ValidationError') {
    error.errors = err?.errors;
  }

  error.errors = err?.errors || [];
  console.log(error);
  return res.status(err.statusCode).send({
    success: false,
    ...error,
  });
};
