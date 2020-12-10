import { PostComment } from './postComment';
import { PostLike } from './PostLike';

export interface Post {
    id: number;
    sourceUserId:number;
    sourceUsername:string;
    kindId:number;
    title: string;
    content: string;
    likes:PostLike[];
    comments:PostComment[];

}
