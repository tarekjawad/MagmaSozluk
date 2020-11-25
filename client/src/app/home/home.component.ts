import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode =  false;
  logined=false;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.logined=this.accountService.logined;
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
  }
  cancelRegisterMode(event:boolean){
    this.registerMode=event;
  }
}
