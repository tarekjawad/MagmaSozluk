import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  model: any = {};

  logined = false;
  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.logined = this.accountService.logined;
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/members');
    });
  }
}
