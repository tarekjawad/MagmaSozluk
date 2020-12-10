import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { config } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users!: Partial<User[]>;
  bsModalRef!: BsModalRef;

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }
  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users) => {
      this.users = users;
    });
  }
  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user),
      },
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) =>{
      const rolesToUpdate={
        roles:[...values.filter((el: { checked: boolean; })=>el.checked===true).map((el: { name: any; }) => el.name)]
      }
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user.username,rolesToUpdate.roles).subscribe(()=>{
          user.roles=[...rolesToUpdate.roles]
        })
      }
    });
  }
  private getRolesArray(user: User) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { label: 'Yönetici', value: 'Admin', name: 'Admin' },
      { label: 'Moderatör', value: 'Moderator', name: 'Moderator' },
      { label: 'Öğrenci', value: 'Student' , name: 'Student'},
      { label: 'Öğretmen', value: 'Teacher' , name: 'Teacher'},
      { label: 'Süper Öğrenci', value: 'SuperStudent' , name: 'SuperStudent'},
      { label: 'Süper Öğretmen', value: 'SuperTeacher', name: 'SuperTeacher' },
      { label: 'Ayın Öğrencisi', value: 'MonthsStudent', name: 'MonthsStudent' },
      { label: 'Ayın Öğretmeni', value: 'MonthsTeacher' , name: 'MonthsTeacher'},
      { label: 'Yılın Öğrenci', value: 'YearsStudent', name: 'YearsStudent' },
      { label: 'Yılın Öğretmeni', value: 'YearsTeacher' , name: 'YearsTeacher'},
    ];
    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }
}
