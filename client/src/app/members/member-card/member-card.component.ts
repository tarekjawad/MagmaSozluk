import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { School } from 'src/app/_models/school';
import { MembersService } from 'src/app/_services/members.service';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input()
  member!: Member;
  memberSchool: School | undefined;
  schools!: Observable<School[]>;
  featherIcon = faFeatherAlt;
  constructor(
    private memberService: MembersService,
    private toastr: ToastrService,
    public presence: PresenceService
  ) {}

  addFollow(member: Member) {
    this.memberService.addFollow(member.username).subscribe(() => {
      this.toastr.success(member.knownAs + ' adlı kişiyi takip ettiniz.');
    });
  }

  ngOnInit(): void {
    this.memberSchool = this.memberService.schools.find(
      (x) => x.id == this.member.schoolId
    );
  }
}
