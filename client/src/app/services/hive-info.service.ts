import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Hive } from '../interfaces/hive';

@Injectable()
export class HiveInfoService {
  hasHives: any = [];

  constructor(private http: Http) {}

  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message);
  }

  getOne(id) {
    return this.http
      .get(`${environment.BASEURL}/api/hive/${id}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  getAll(id) {
    return this.http
      .get(`${environment.BASEURL}/api/hive/user/${id}`)
      .map(hives => {
        this.hasHives = hives;
        console.log('THIS.HASHIVES: ' + this.hasHives);
        return hives;
      })
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  getAllBeekeeperHives(id) {
    return this.http
      .get(`${environment.BASEURL}/api/hive/beekeeper/${id}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  newHive(data) {
    return this.http
      .post(`${environment.BASEURL}/api/hive/new`, data)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
