import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {
  showForm: boolean = true;
  user:any;
  userEvent: EventEmitter<any> = new EventEmitter();
  options: any = { withCredentials:true };

  constructor(private http: Http, public router: Router) {
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    console.log(e);
    return Observable.throw(e.json().message)
  }

  handleUser(user?:object){
    this.user = user;
    this.userEvent.emit(this.user);
    return this.user;
  }

  signup(user) {
    return this.http.post(`${environment.BASEURL}/api/auth/signup`, user, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  login(email, password) {
    return this.http
      .post(`${environment.BASEURL}/api/auth/login`, { email, password }, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  logout() {
    return this.http
      .get(`${environment.BASEURL}/api/auth/logout`, this.options)
      .map(() => this.handleUser())
      .do(() => this.router.navigate((['/home'])))
      .catch(error => this.handleError(error));
  }

  isLoggedIn() {
    return this.http
      .get(`${environment.BASEURL}/api/auth/loggedin`, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  fillDetails(update) {
    return this.http.post(`${environment.BASEURL}/api/auth/fill-details`, update, this.options)
    .map(res => res.json())
    .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  updateProfile(update) {
    return this.http
      .post(`${environment.BASEURL}/api/auth/update-profile`, update, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  deleteAccount(id){
    console.log(id)
    return this.http
      .post(`${environment.BASEURL}/api/auth/delete-profile/${id}`, this.options)
      .map(res => res.json())
      .map(user => this.handleUser())
      .catch(error => this.handleError(error));
  }

  toggleForm() {
    this.showForm = !this.showForm
  }

}
