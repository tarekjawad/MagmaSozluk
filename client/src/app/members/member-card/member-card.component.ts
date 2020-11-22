import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { School } from 'src/app/_models/school';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input()
  member!: Member;
  memberSchool: School|undefined;
  schools!: Observable<School[]>;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.memberSchool = this.memberService.schools.find(
      (x) => x.id == this.member.schoolId
    );
  }
}
