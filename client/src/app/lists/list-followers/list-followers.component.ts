import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-list-followers',
  templateUrl: './list-followers.component.html',
  styleUrls: ['./list-followers.component.css'],
})
export class ListFollowersComponent implements OnInit {
  members!: Partial<Member[]>;
  predicate = 'followedBy';
  pageNumber = 1;
  pageSize = 18;
  pagination!:Pagination;

  constructor(private memberServices: MembersService) {}

  ngOnInit(): void {
    this.loadFollowers();
  }

  loadFollowers() {
    this.memberServices.getFollows(this.predicate,this.pageNumber,this.pageSize).subscribe((response) => {
      this.members = response.result;
      this.pagination=response.pagination;
    });
  }
  pageChanged(event:any){
    this.pageNumber=event.page;
    this.loadFollowers();
  }
}
