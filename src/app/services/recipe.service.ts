import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recipe } from '../tokens';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Recipe[] | undefined> {
    return this.http.get<Recipe[]>(`${environment.apiPath}/recipe`);
  }

  public getByUser(userId: string): Observable<Recipe[] | undefined> {
    return this.http.get<Recipe[]>(
      `${environment.apiPath}/recipe/user/${userId}`
    );
  }

  public getById(id: string): Observable<Recipe | undefined> {
    return this.http.get<Recipe>(`${environment.apiPath}/recipe/${id}`);
  }

  public create(recipe: Recipe): Observable<any> {
    return this.http.post(`${environment.apiPath}/recipe`, recipe);
  }

  public update(recipe: Recipe): Observable<any> {
    return this.http.put(`${environment.apiPath}/recipe/${recipe.id}`, recipe);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<Recipe>(`${environment.apiPath}/recipe/${id}`);
  }
}
