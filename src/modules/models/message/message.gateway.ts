// Import the necessary modules
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, OnModuleInit } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageV1ReqDto } from './dto/request/create-message.v1.req.dto';
import { Message } from './entities/message.entity';
import { ClientId } from '~common/types/client-id.type';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: MessageService) {}

  onModuleInit(): void {
    this.server.on('connection', (socket: Socket) => {
      Logger.log(`Client ${socket.id} connected!!!`);
    });
  }

  // Handle incoming messages
  @SubscribeMessage('createMessage')
  handleMessage(@MessageBody() message: CreateMessageV1ReqDto): void {
    // Broadcast the message to all connected clients
    this.messageService.addMessage(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('getAllMessages')
  getAllMessages(): Message[] {
    return this.messageService.getAllMessages();
  }

  @SubscribeMessage('sendMessageToRoom')
  sendMessageToRoom(
    @MessageBody() message: CreateMessageV1ReqDto,
    @ConnectedSocket() client: Socket
  ): void {
    const room = this.messageService.getRoomByClientId(new ClientId(client.id));
    if (room) {
      client.to(room).emit('message', message.text);
    }
  }

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody()
    payload: {
      room: string;
      name: string;
      text: string;
    },
    @ConnectedSocket() client: Socket
  ): void {
    const room = this.messageService.getRoomByClientId(new ClientId(client.id));
    if (room) {
      Logger.log(`Client ${payload.name} already in ${room}`);
      return;
    }

    Logger.log(`Client ${payload.name} joined room ${payload.room}`);
    client.join(payload.room);
    this.messageService.addClientToRoom(new ClientId(client.id), payload.room);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody() isTyping: boolean,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const clientName = this.messageService.getClientName(
      new ClientId(client.id)
    );

    // NOTE: emit every except the client that is typing
    client.broadcast.emit('typing', {
      name: clientName,
      isTyping
    });
  }
}
