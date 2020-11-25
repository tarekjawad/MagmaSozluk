import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-list-followings',
  templateUrl: './list-followings.component.html',
  styleUrls: ['./list-followings.component.css'],
})
export class ListFollowingsComponent implements OnInit {
  members!: Partial<Member[]>;
  predicate = 'followed';
  pageNumber = 1;
  pageSize = 18;
  pagination: Pagination | undefined;

  constructor(private memberServices: MembersService) {}

  ngOnInit(): void {
    this.loadFollowers();
  }

  loadFollowers() {
    this.memberServices.getFollows(this.predicate,this.pageNumber,this.pageSize).subscribe((response) => {
      this.pagination=response.pagination;
      this.members = response.result;
    });
  }
  pageChanged(event:any){
    this.pageNumber=event.page;
    this.loadFollowers();
  }
}
