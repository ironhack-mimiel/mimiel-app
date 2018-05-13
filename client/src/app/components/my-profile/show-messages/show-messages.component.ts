import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../services/messaging.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent implements OnInit {
  sentMessages: Array<Object>;
  receivedMessages: Array<Object>;
  showReply: boolean = false;
  constructor(
    public messagingService: MessagingService,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.messagingService
      .getReceivedMessages(this.sessionService.user._id)
      .subscribe(messages => (this.receivedMessages = messages));
    this.messagingService
      .getSentMessages(this.sessionService.user._id)
      .subscribe(messages => (this.sentMessages = messages));
  }

  readMessage(id) {
    this.messagingService
      .readMessage(id)
      .subscribe(() =>
        this.messagingService
          .getReceivedMessages(this.sessionService.user._id)
          .subscribe(messages => (this.receivedMessages = messages))
      );
  }

  toggleReply = (event ?) => this.showReply = !this.showReply
}
