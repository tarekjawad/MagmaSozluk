import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { School } from 'src/app/_models/school';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input()
  member!: Member;
  memberSchool!:School;
  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    this.getSchool(this.member.schoolId);
  }

  getSchool(schoolId:number){
    return this.memberService.getMemberSchool(schoolId).subscribe(school=>{
      this.memberSchool=school;
    })
  }
}
