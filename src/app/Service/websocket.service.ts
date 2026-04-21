import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../Model/Message';
import { MessageDto } from '../Model/MessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient!: Client;

  private messagesMap = new Map<number, Message[]>();

  private activeDiscussionId: number | null = null;

  public messages$ = new BehaviorSubject<Message[]>([]);

  connect() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8085/chat'),
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = () => {
      console.log('✅ WebSocket connected');
    };

    this.stompClient.activate();
  }

  setActiveDiscussion(discussionId: number) {
    this.activeDiscussionId = discussionId;

    const existing = this.messagesMap.get(discussionId) || [];
    this.messages$.next(existing);

    this.subscribeToDiscussion(discussionId);
  }

  private subscribeToDiscussion(discussionId: number) {

    this.stompClient.subscribe(`/topic/discussion/${discussionId}`, (msg) => {

      const newMessage: Message = JSON.parse(msg.body);

      const current = this.messagesMap.get(discussionId) || [];

      const updated = [...current, newMessage];

      this.messagesMap.set(discussionId, updated);

      if (this.activeDiscussionId === discussionId) {
        this.messages$.next(updated);
      }
    });
  }

  sendMessage(dto: MessageDto) {
    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(dto)
    });
  }
}