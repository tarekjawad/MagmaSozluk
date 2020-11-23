import { Component, OnInit } from '@angular/core';
import { table } from 'console';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Class } from 'src/app/_models/class';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { School } from 'src/app/_models/school';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members!: Member[];
  schools!: School[];
  schools$!:Observable<School[]>;
  classes!: Class[];
  cities: string[] = [];
  pagination: Pagination | undefined;
  userParams!: UserParams;
  user!: User;

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(0, 0, "");
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe((response) => {
      this.pagination = response.pagination;
      this.members = response.result;
    });
    this.memberService.getSchools().subscribe((schools) => {
      this.memberService.schools = schools;
      this.schools = schools;
      this.schools.forEach((school) => {
        if (!this.cities.includes(school.city)) {
          this.cities.push(school.city);
        }
      });
    });
    this.memberService.getClasses().subscribe((classes) => {
      this.memberService.classes = classes;
      this.classes = classes;
    });
  }
  resetFilters() {
    this.userParams = new UserParams(0, 0, "");
    this.loadMembers();
  }
  reloadFilters() {
    this.userParams = new UserParams(0, 0, "");
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }
}
