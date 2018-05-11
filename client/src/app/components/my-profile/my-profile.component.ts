import { Injectable, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {


  rightComponent: string = '';

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}


}
