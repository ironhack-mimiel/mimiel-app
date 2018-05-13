import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  message: string;
  to: string = "5af30bb4e5e90f2a4223efd0";  
  hidden: boolean = true;

  constructor(public messagingService: MessagingService, public sessionService: SessionService) {  
  }

  ngOnInit() {
    
  }
  sendMessage() {
    const message = {
      from: this.sessionService.user._id,
      to: this.to,
      message: this.message,
    };
    this.messagingService.sendMessage(message).subscribe(() => this.hidden = !this.hidden)
  }
}
