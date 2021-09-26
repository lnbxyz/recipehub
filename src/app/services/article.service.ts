import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from '../tokens';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  // TEMPORARY
  private mockData: Article[] = [
    {
      id: '6609377e-13b6-415c-b1a4-1b0d25549a6b',
      name: 'Nome do artigo',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisi a dui fringilla venenatis. Vestibulum diam risus, venenatis vel urna ut, sollicitudin dapibus nibh. Integer quam risus, tincidunt nec dui in, suscipit blandit turpis. Praesent elementum turpis non tempus dapibus. Aenean suscipit, velit ac sollicitudin maximus.',
      userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
      user: {
        id: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        name: 'Mary Poppins',
        email: '',
        username: '',
      },
      commentCount: 13,
      likeCount: 129,
      createdOn: '2021-09-26T21:40:10.739Z',
      liked: false,
      recipes: [
        {
          id: 'fc479204-90fa-46f8-a57a-13a4ef232b23',
          name: 'Bolinho de carne',
          userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        },
        {
          id: '60a1dfcb-c2b3-42be-ac91-1b6b3a861cc3',
          name: 'Torta de limão',
          userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        },
        {
          id: 'f2e8a461-7a02-4e17-87ad-52f7139cd803',
          name: 'Aperol Spritz',
          userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        },
      ],
    },
    {
      id: '276101cc-aa3d-4930-a7cb-35942f13d041',
      name: 'Receitas pra churrasco 😮😍😁 quebra linha aqui pra testar o tamanho!!!!!!!111!! 😎😋',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus tellus, feugiat nec bibendum a, feugiat sit amet enim. Pellentesque eu pulvinar leo, vestibulum aliquet tortor. Pellentesque sit amet pretium nulla. Nunc accumsan enim et risus vehicula semper. Cras hendrerit, risus ut gravida porta, est dolor mollis risus, eu aliquam elit nunc a dui.',
      userId: 'b8dfe737-1849-4043-b8ef-21b149ba8d29',
      user: {
        id: 'b8dfe737-1849-4043-b8ef-21b149ba8d29',
        name: 'William Shakespeare',
        email: '',
        username: '',
      },
      commentCount: 0,
      likeCount: 0,
      createdOn: '2021-08-22T20:37:10.739Z',
      liked: false,
      recipes: [
        {
          id: 'fc479204-90fa-46f8-a57a-13a4ef232b23',
          name: 'Tiras de Wagyu A5',
          userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        },
        {
          id: '60a1dfcb-c2b3-42be-ac91-1b6b3a861cc3',
          name: 'Queijo coalho',
          userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        },
        {
          id: 'f2e8a461-7a02-4e17-87ad-52f7139cd803',
          name: 'Caipirinha de morango',
          userId: 'b8812df4-5c33-4c25-a15e-e5ef232d9df3',
        },
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Article[] | undefined> {
    return of(this.mockData).pipe(delay(1000));
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
