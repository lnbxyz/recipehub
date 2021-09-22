import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'rh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  mockLogin() {
    this.userService.login({
      username: 'lunabunna',
      password: '123qwe',
    });
  }

  mockLogout() {
    this.userService.logout();
  }
}
