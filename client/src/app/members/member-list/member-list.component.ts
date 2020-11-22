import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/_models/class';
import { Member } from 'src/app/_models/member';
import { School } from 'src/app/_models/school';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members$!: Observable<Member[]>;
  schools$!: School[];
  classes$!:Class[];
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
    this.memberService.getSchools().subscribe((schools) => {
      this.memberService.schools = schools;
      this.schools$ = schools;
    });
    this.memberService.getClasses().subscribe((classes) => {
      this.memberService.classes = classes;
      this.classes$ = classes;
    });;
  }
}
