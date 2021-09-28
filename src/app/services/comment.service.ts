import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../tokens';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  public getByArticle(articleId: string): Observable<Comment[] | undefined> {
    return this.http.get<Comment[]>(
      `${environment.apiPath}/article/${articleId}/comment`
    );
  }

  public getById({
    articleId,
    commentId,
  }: {
    articleId: string;
    commentId: string;
  }): Observable<Comment[] | undefined> {
    return this.http.get<Comment[]>(
      `${environment.apiPath}/article/${articleId}/comment/${commentId}`
    );
  }

  public create(comment: Comment): Observable<any> {
    return this.http.post(
      `${environment.apiPath}/article/${comment.articleId}/comment`,
      comment
    );
  }

  public update(comment: Comment): Observable<any> {
    return this.http.put(
      `${environment.apiPath}/article/${comment.articleId}/comment/${comment.id}`,
      comment
    );
  }

  public delete({
    articleId,
    commentId,
  }: {
    articleId: string;
    commentId: string;
  }): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiPath}/article/${articleId}/comment/${commentId}`
    );
  }
}
