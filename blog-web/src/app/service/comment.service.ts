import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  createComment(postId: number, postedBy: string, content: string): Observable<any> {
    const params = new HttpParams()
      .set('postId', postId.toString())
      .set('postedBy', postedBy);

    const headers = new HttpHeaders()
      .set('Content-Type', 'text/plain');  // Send raw string, not JSON

    return this.http.post<any>(
      `${BASIC_URL}/api/comments/create`,
      content,
      { headers, params }
    );
  }

  getAllCommentsByPost (postId:number): Observable<any>{
  return this.http.get(`${BASIC_URL}/api/comments/${postId}`);


}
}
