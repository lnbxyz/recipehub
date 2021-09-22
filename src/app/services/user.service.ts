import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  public isLoggedIn = new Subject<boolean>();

  public get currentUser(): User | undefined {
    const data = localStorage.getItem('login');
    return data ? JSON.parse(data) : undefined;
  }

  constructor(public http: HttpClient) {}

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
    this.logout();
    this.http
      .post(`${environment.apiPath}/user/login`, {
        username,
        password,
      })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('login', JSON.stringify(result));
          this.isLoggedIn.next(true);
        }
      });
  }

  public logout(): void {
    localStorage.removeItem('login');
    this.isLoggedIn.next(false);
  }

  public doLoginCheck(): void {
    if (this.currentUser?.username && this.currentUser?.password) {
      this.login({
        username: this.currentUser.username,
        password: this.currentUser.password,
      });
    } else {
      this.logout();
    }
  }
}
