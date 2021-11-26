import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../tokens';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Recipe[] | undefined> {
    return this.http.get<Recipe[]>(`${environment.apiPath}/recipe`);
  }

  public getByUser({
    userId,
    searchTerm,
    availableOnly,
  }: {
    userId: string;
    searchTerm?: string;
    availableOnly?: boolean;
  }): Observable<Recipe[] | undefined> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    params = params.append(
      'availableOnly',
      (availableOnly || false).toString()
    );
    return this.http.get<Recipe[]>(
      `${environment.apiPath}/recipe/user/${userId}`,
      { params }
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
