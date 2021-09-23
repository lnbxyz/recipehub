import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  public get currentUser(): User | undefined {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : undefined;
  }

  constructor(private http: HttpClient, private router: Router) {}

  public create(user: User): Observable<any> {
    return this.http.post(`${environment.apiPath}/user`, user);
  }

  public update(user: User): Observable<any> {
    return this.http.put(`${environment.apiPath}/user/${user.id}`, user).pipe(
      tap((result) => {
        if (result) {
          localStorage.setItem('currentUser', JSON.stringify(result));
        }
      })
    );
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiPath}/user/${id}`);
  }

  public login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<User> {
    localStorage.removeItem('currentUser');
    return this.http
      .post<User>(`${environment.apiPath}/user/login`, {
        username,
        password,
      })
      .pipe(
        tap((result) => {
          if (result) {
            localStorage.setItem('currentUser', JSON.stringify(result));
            this.router.navigate(['']);
          }
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['auth']);
  }
}
