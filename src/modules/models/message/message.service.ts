import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { ClientId } from '~common/types/client-id.type';

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  private clientToUserMap: Map<string, string> = new Map();

  getAllMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  deleteMessage(index: number): void {
    this.messages.splice(index, 1);
  }

  identifyMessageSender(name: string, clientId: ClientId): unknown[] {
    this.clientToUserMap.set(clientId.value, name);
    return Object.values(this.clientToUserMap);
  }

  getClientName(clientId: ClientId): string {
    return this.clientToUserMap.get(clientId.value);
  }

  getRoomByClientId(clientId: ClientId): string {
    return this.clientToUserMap.get(clientId.value);
  }

  addClientToRoom(clientId: ClientId, room: string): void {
    this.clientToUserMap.set(clientId.value, room);
  }
}
