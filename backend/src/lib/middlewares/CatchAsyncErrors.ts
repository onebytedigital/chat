import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export default (
    func: (
      arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      arg1: Response<any, Record<string, any>>,
      arg2: NextFunction,
    ) => Promise<any>,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next).catch(next));
  };
