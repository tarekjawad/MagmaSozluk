import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;
  posts:Post[]=[];
  constructor(private http: HttpClient) { }
  getPosts() {
    return this.http.get<Post[]>(this.baseUrl + 'posts').pipe(
      map((posts) => {
        this.posts = posts;
        return posts;
      })
    );
  }
}
