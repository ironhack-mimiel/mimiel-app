import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class MessagingService {
  constructor(private http: Http) {}
  options: any = { withCredentials:true };

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getReceivedMessages(id) {
    return this.http
      .get(`${environment.BASEURL}/api/messages/received/${id}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  getSentMessages(id) {
    return this.http
      .get(`${environment.BASEURL}/api/messages/sent/${id}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  sendMessage(message) {
    return this.http.post(`${environment.BASEURL}/api/messages`, message, this.options)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  readMessage(id) {
    return this.http.get(`${environment.BASEURL}/api/messages/${id}`)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  activatePatron(hiveId, userId) {
    return this.http.put(`${environment.BASEURL}/api/messages/${hiveId}`, {userId})
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }
}
