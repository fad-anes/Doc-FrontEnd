import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../Service/DiscussionService';
import { DoctorService } from '../Service/DoctorService';
import { WebSocketService } from '../Service/websocket.service';
import { AuthService } from '../Service/AuthService';
import { Discussion } from '../Model/Discussion';
import { Message } from '../Model/Message';
import { Doctor } from '../Model/Doctor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: any;

  discussions: Discussion[] = [];
  selectedDiscussion!: Discussion;

  messages: Message[] = [];
  newMessage: string = '';

  doctors: Doctor[] = [];
  showAddPopup = false;
openMenuId: number | null = null;
  private messagesSub!: Subscription;

  constructor(
    private discussionService: DiscussionService,
    private doctorService: DoctorService,
    private ws: WebSocketService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getDetails();

    this.loadDiscussions();
    this.ws.connect();
  }

  // 🔹 Load discussions
  loadDiscussions() {
    this.discussionService
      .getDiscussions(this.user.id, this.user.role)
      .subscribe(res => {
        this.discussions = res;
      });
  }

  selectDiscussion(d: Discussion) {

  this.selectedDiscussion = d;

  // 1. charger anciens messages
  this.messages = d.messages ? [...d.messages] : [];

  // 2. reset subscription précédente
  if (this.messagesSub) {
    this.messagesSub.unsubscribe();
  }

  // 3. activer discussion WebSocket
  this.ws.setActiveDiscussion(d.id);

  // 4. écouter nouveaux messages
  this.messagesSub = this.ws.messages$
    .subscribe((msgs) => {

      // 🔥 fusion intelligente (évite duplication)
      const merged = this.mergeMessages(this.messages, msgs);

      this.messages = merged;

      setTimeout(() => this.scrollBottom(), 100);
    });
}
mergeMessages(oldMsgs: Message[], newMsgs: Message[]): Message[] {

  const map = new Map<number, Message>();

  [...oldMsgs, ...newMsgs].forEach(m => {
    map.set(m.id, m); // évite doublons
  });

  return Array.from(map.values())
    .sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
}
  // 🔹 Send message
  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedDiscussion) return;

    this.ws.sendMessage({
      discussionId: this.selectedDiscussion.id,
      content: this.newMessage,
      who: this.user.role
    });

    this.newMessage = '';
  }
toggleMenu(id: number) {
  this.openMenuId = this.openMenuId === id ? null : id;
}

deleteDiscussion(id: number) {
  this.discussionService.deleteDiscussion(id).subscribe(() => {
    location.reload();
  });
}
  // 🔹 Open popup
  openAdd() {
    this.showAddPopup = true;

    this.doctorService.retrieveAllDoctor()
      .subscribe(res => this.doctors = res);
  }

  // 🔹 Create discussion
  createDiscussion(doctorId: number) {
    this.discussionService
      .createDiscussion(this.user.id, doctorId)
      .subscribe(() => {
        this.showAddPopup = false;
        this.loadDiscussions();
      });
  }

  // 🔹 Helpers
  isMine(msg: Message): boolean {
    return msg.who === this.user.role;
  }
  photoOuAvatar(d: Discussion): boolean{
if (this.user.role === 'PATIENT') {
      return true
    }
   
    return false
  }

  getOtherName(d: Discussion): string {
    if (this.user.role === 'PATIENT') {
      return d.doctor.firstName + ' ' + d.doctor.lastName;
    }
    return d.patient.firstName + ' ' + d.patient.lastName;
  }

  scrollBottom() {
    const el = document.getElementById('chat-body');
    if (el) el.scrollTop = el.scrollHeight;
  }
}