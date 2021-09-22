import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  public get currentUser(): User | undefined {
    const data = localStorage.getItem('login');
    return data ? JSON.parse(data) : undefined;
  }

  constructor(private http: HttpClient, private router: Router) {}

  public create(user: User): Observable<any> {
    return this.http.post(`${environment.apiPath}/user`, user);
  }

  public update(user: User): Observable<any> {
    return this.http.put(`${environment.apiPath}/user/${user.id}`, user);
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
  }): void {
    localStorage.removeItem('login');
    this.http
      .post(`${environment.apiPath}/user/login`, {
        username,
        password,
      })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('login', JSON.stringify(result));
          this.router.navigate(['']);
        }
      });
  }

  public logout(): void {
    localStorage.removeItem('login');
    this.router.navigate(['auth']);
  }
}
