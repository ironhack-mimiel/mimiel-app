import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { SessionService } from '../../services/session.service';

interface Hive {
  _id: string;
  name: string;
  description: string;
  beekeeper: string;
  rpi: object;
  patrons: Array<any>;
}

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  message: string;

  @Output() onToggleForm = new EventEmitter<boolean>();

  @Input() hiveInfo: Hive;

  constructor(
    public messagingService: MessagingService,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    console.log(this.hiveInfo)
  }

  sendMessage() {
    const message = {
      from: this.sessionService.user._id,
      to: this.hiveInfo.beekeeper,
      hive: this.hiveInfo._id,
      message: this.message
    };
    this.messagingService
      .sendMessage(message)
      .subscribe(() => this.onToggleForm.emit());
  }
}
