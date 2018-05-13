import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable()
export class IsPatronService {

  constructor(public router: Router) { }

  isPatron(patronList, userId): boolean {
    return patronList.includes(userId) ? true : false;
  }
}
