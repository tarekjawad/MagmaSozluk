import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Class } from 'src/app/_models/class';
import { Member } from 'src/app/_models/member';
import { School } from 'src/app/_models/school';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User;
  memberSchool!: School|undefined;
  memberClass!: Class|undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
      
      this.memberService.getSchools().subscribe(schools=>{
        this.memberSchool= schools.find(
          (x) => x.id == member.schoolId
        );
      }) 
      
      this.memberService.getClasses().subscribe(classes=>{
        this.memberClass= classes.find(
          (x) => x.id == member.classId
        );
      }) ;
     
    });
  }
  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profiliniz güncellendi');
      this.editForm.reset(this.member);
    });
  }
}
