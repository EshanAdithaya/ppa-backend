import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CustomLoggerService } from './custom-logger.service';

@WebSocketGateway()
export class LoggerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly customLoggerService: CustomLoggerService) {}

  handleConnection(client: any) {
    this.customLoggerService.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.customLoggerService.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getLogs')
  getLogs(): string[] {
    const logs = this.customLoggerService.getLogs();
    this.server.emit('logs', logs);
    return logs;
  }
}
