import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from '../tokens';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getAll({
    userId,
  }: {
    userId?: string;
  }): Observable<Article[] | undefined> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }
    return this.http.get<Article[]>(`${environment.apiPath}/article`, {
      params,
    });
  }

  public getByUser(userId: string): Observable<Article[] | undefined> {
    return this.http.get<Article[]>(
      `${environment.apiPath}/article/user/${userId}`
    );
  }

  public getById({
    articleId,
    userId,
  }: {
    articleId: string;
    userId?: string;
  }): Observable<Article | undefined> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }
    return this.http.get<Article>(
      `${environment.apiPath}/article/${articleId}`,
      { params }
    );
  }

  public create(article: Article): Observable<any> {
    return this.http.post(`${environment.apiPath}/article`, article);
  }

  public update(article: Article): Observable<any> {
    return this.http.put(
      `${environment.apiPath}/article/${article.id}`,
      article
    );
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<Article>(`${environment.apiPath}/article/${id}`);
  }

  public like(articleId: string, userId: string): Observable<any> {
    return this.http.post(
      `${environment.apiPath}/article/${articleId}/like`,
      null,
      { params: new HttpParams({ fromObject: { userId } }) }
    );
  }

  public dislike(articleId: string, userId: string): Observable<any> {
    return this.http.delete(
      `${environment.apiPath}/article/${articleId}/like`,
      { params: new HttpParams({ fromObject: { userId } }) }
    );
  }
}
