import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  showErrorMessageComponent: boolean = false;
  error: any = 'hola';

  constructor() { }

}
