import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class MessagingService {
  constructor(private http: Http) {}

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getReceivedMessages(id) {
    return this.http
      .get(`${environment.BASEURL}/api/messages/received/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getSentMessages(id) {
    return this.http
      .get(`${environment.BASEURL}/api/messages/sent/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
