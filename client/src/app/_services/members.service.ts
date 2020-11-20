import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Class } from '../_models/class';
import { Member } from '../_models/member';
import { School } from '../_models/school';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMemberSchool(schoolId:number){
    return this.http.get<School>(this.baseUrl+'education/school/'+schoolId);
  }
  getMemberClass(classId:number){
    return this.http.get<Class>(this.baseUrl+'education/class/'+classId)
  }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
