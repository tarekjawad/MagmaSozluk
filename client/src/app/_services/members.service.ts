import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Class } from '../_models/class';
import { Member } from '../_models/member';
import { School } from '../_models/school';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  classes: Class[] = [];
  schools: School[] = [];

  constructor(private http: HttpClient) {}
  getMemberSchool(schoolId: number) {
    if (this.schools.length > 0)  {
      const school = this.schools.find((x) => x.id === schoolId);
    if (school != undefined) return of(school);
    }
    
    return this.http.get<School>(this.baseUrl + 'education/school/' + schoolId);
  }

 
  
  getSchools() {
    if (this.schools.length > 0) return of(this.schools);
    return this.http.get<School[]>(this.baseUrl + 'education/schools').pipe(
      map((schools) => {
        this.schools = schools;
        return schools;
      })
    );
  }
  getClasses() {
    if (this.classes.length > 0) return of(this.classes);
    return this.http.get<Class[]>(this.baseUrl + 'education/classes').pipe(
      map((classes) => {
        this.classes = classes;
        return classes;
      })
    );
  }
  getMemberClass(classId: number) {
    const clas = this.classes.find((x) => x.id === classId);
    if (clas != undefined) return of(clas);
    return this.http.get<Class>(this.baseUrl + 'education/class/' + classId);
  }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }
  getMember(username: string) {
    const member = this.members.find((x) => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
  setMainPhoto(photoId:number){
    return this.http.put(this.baseUrl + "users/set-main-photo/"+photoId,{})
  }
  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl+"users/delete-photo/"+photoId);
  }
}
