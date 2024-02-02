import { NextFunction, Request, Response } from 'express';

export async function auth(req: Request, res: Response, next: NextFunction) {
  if (
    req.path === '/api/v1/docs' ||
    req.path.includes('img') ||
    req.path.includes('css') ||
    req.path.includes('vendor') ||
    req.path.includes('scripts') ||
    req.path.includes('/oauth2') ||
    req.path.includes('/webhook') ||
    req.path.includes('/test')
  )
    return next();

  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Não autorizado!' });
  }

  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username === 'r2pp' && password === 'Nec@2023') {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Usuário e/ou senha incorretos!',
    });
  }
}
