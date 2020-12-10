import { User } from './user';

export class UserParams {
  schoolId!: number;
  classId!: number;
  city!: string;
  pageNumber = 1;
  PageSize = 12;
  orderBy="lastActive"

  constructor(schoolId: number, classId: number, city: string){
    this.schoolId=schoolId;
    this.classId=classId;
    this.city=city;
  }
}
