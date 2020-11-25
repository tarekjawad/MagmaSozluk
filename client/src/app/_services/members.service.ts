import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Class } from '../_models/class';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { School } from '../_models/school';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  classes: Class[] = [];
  schools: School[] = [];
  memberCache = new Map();
  user!: User;
  userParams!: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(0, 0, '');
    });
  }

  getUserParams() {
    return this.userParams;
  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  resetUserParams() {
    this.userParams = new UserParams(0, 0, '');
    return this.userParams;
  }

  getMemberSchool(schoolId: number) {
    if (this.schools.length > 0) {
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

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response) {
      return of(response);
    }

    let params = this.getPaginitionHeaders(
      userParams.pageNumber,
      userParams.PageSize
    );

    if (userParams.city != null) {
      params = params.append('city', userParams.city);
      if (userParams.schoolId !== 0 && userParams.classId === 0) {
        params = params.append('schoolId', userParams.schoolId!.toString());
      }
      if (userParams.schoolId !== 0 && userParams.classId !== 0) {
        params = params.append('schoolId', userParams.schoolId!.toString());
        params = params.append('classId', userParams.classId!.toString());
      }
    } else {
      if (userParams.schoolId !== 0 && userParams.classId === 0) {
        params = params.append('schoolId', userParams.schoolId!.toString());
      }
      if (userParams.schoolId !== 0 && userParams.classId !== 0) {
        params = params.append('schoolId', userParams.schoolId!.toString());
        params = params.append('classId', userParams.classId!.toString());
      }
    }
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      this.baseUrl + 'users',
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }
  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http
      .get<T>(url, { observe: 'response', params })
      .pipe(
        map((response) => {
          if (response.body) {
            paginatedResult.result = response.body;
          }
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')!
            );
          }
          return paginatedResult;
        })
      );
  }

  private getPaginitionHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }
  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);

    if (member) {
      return of(member);
    }
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
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
  addFollow(username: string) {
    return this.http.post(this.baseUrl + 'follows/' + username, {});
  }
  getFollows(predicate: string,pageNumber:number,pageSize:number) {

    let params =this.getPaginitionHeaders(pageNumber,pageSize)
    params=params.append("predicate",predicate);
    return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl+"follows",params);
  }
}
