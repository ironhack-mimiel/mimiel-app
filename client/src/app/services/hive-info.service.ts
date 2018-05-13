import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class HiveInfoService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getOne(id) {
    return this.http.get(`${environment.BASEURL}/api/hive/${id}`)
    .map(res => res.json())
    .catch(this.handleError)
  }

  getAll(id) {
    return this.http.get(`${environment.BASEURL}/api/hive/user/${id}`)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
