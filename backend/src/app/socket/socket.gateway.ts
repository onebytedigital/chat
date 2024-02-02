import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { logInfo } from '../../lib/utils';

export default class SocketGateway {
  constructor(server: HttpServer) {
    logInfo('info', 'Socket initialized successfully!');
    const io = new Server(server);

    io.on('connect', (socket: Socket) => {
      logInfo('info', 'Novo usuário conectado');
      socket.on('sendMessage', async (data: any) => {
        io.emit('receiveMessage', data);
      });
    });
  }
}
