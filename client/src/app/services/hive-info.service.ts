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
    console.log(e)
    return Observable.throw(e.json().message);
  }

  getOne(id) {
    return this.http.get(`${environment.BASEURL}/api/hive/${id}`)
    .map(res => res.json())
    .catch(error => this.handleError(error))
  }

  getAll(id) {
    return this.http.get(`${environment.BASEURL}/api/hive/user/${id}`)
      .map(res => res.json())
      .catch(error => this.handleError(error))
  }

  newHive(data) {
    return this.http.post(`${environment.BASEURL}/api/hive/new`, data)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
