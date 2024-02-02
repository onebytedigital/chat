import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as env from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import PromiseRouter from 'express-promise-router';
import path from 'path';
import onError from './lib/middlewares/Error';
import { RouterProps, Routes } from './lib/routes/router';
import { logInfo } from './lib/utils';
import { setTimeout } from './lib/utils/setTimeout';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import SocketGateway from './app/socket/socket.gateway';

env.config();

const router = PromiseRouter();
const routes: any = Routes();

routes.forEach((route: RouterProps) => {
  router[route.method.toLowerCase()](route.route, async (req: Request, res: Response, next: NextFunction) => {
    const insteadClass = new (route.controller as any)();
    return await insteadClass[route.action](req, res, next);
  });
});

router.use(onError);

const app: any = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(setTimeout);
app.use(express.static(path.join(process.cwd(), 'src', 'views', 'assets')));
app.use('/img', express.static(path.join(process.cwd(), 'public', 'img')));

app.use('/api/v1', router);

const server = http.createServer(app);

server.listen(process.env.HOST_PORT, () => {
  logInfo('info', `Welcome to JellyBeans Chat! Running in port ${process.env.HOST_PORT}`, 'green');
  new SocketGateway(server);
});
