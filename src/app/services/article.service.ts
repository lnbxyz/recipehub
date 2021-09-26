import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../tokens';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Article[] | undefined> {
    return this.http.get<Article[]>(`${environment.apiPath}/article`);
  }

  public getByUser(userId: string): Observable<Article[] | undefined> {
    return this.http.get<Article[]>(
      `${environment.apiPath}/article/user/${userId}`
    );
  }

  public getById(id: string): Observable<Article | undefined> {
    return this.http.get<Article>(`${environment.apiPath}/article/${id}`);
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
}
