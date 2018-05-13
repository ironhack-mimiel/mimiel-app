import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent implements OnInit {
  sentMessages: Array<Object>;
  receivedMessages: Array<Object>;
  constructor(public messagingService: MessagingService, public sessionService: SessionService ) { }

  ngOnInit() {
    this.messagingService.getReceivedMessages(this.sessionService.user._id).subscribe(messages => {
      console.log(messages)
      this.receivedMessages = messages});
    this.messagingService.getSentMessages(this.sessionService.user._id).subscribe(messages => this.sentMessages = messages);
  }

}
