import { Photo } from './photo';

export interface Member {
    filter(arg0: (x: any) => boolean): Photo[];
    id: number;
    username: string;
    photoUrl?: any;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    schoolId: number;
    classId: number;
    photos: Photo[];
  }
  
