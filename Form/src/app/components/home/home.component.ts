import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Post } from 'src/app/_models/post';
import { MembersService } from 'src/app/_services/members.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  model: any = {};
  posts: Post[] = [];

  logined = false;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private memberService: MembersService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.logined = this.accountService.logined;
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
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

  getUsername(id: number): string {
    let username;
    this.memberService
      .getMemberWithId(id)
      .subscribe((user) => (username = user.username));
    if (username) {
      return username;
    }
    return '';
  }
}
