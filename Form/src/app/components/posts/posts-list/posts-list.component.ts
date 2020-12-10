import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { MembersService } from 'src/app/_services/members.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: Post[]=[];
  constructor(private postService: PostService,private memberService:MembersService) {}

  ngOnInit(): void {
     this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
  getUsername(id:number):string {
    let username;
    this.memberService
      .getMemberWithId(id)
      .subscribe((user) => (username = user.username));
      if (username) {
        return username;
      }
      return "";
  }
}
