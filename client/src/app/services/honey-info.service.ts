import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class HoneyInfoService {
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getAll() {
    return this.http.get(`${environment.BASEURL}/api/honey`)
    .map(res => res.json())
    .catch(error => this.handleError(error))
  }

  getOne(id) {
    return this.http.get(`${environment.BASEURL}/api/honey/${id}`)
    .map(res => res.json())
    .catch(error => this.handleError(error))
  }
}
