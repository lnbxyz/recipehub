import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'rh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public items: { name: string; link: string }[] = [
    {
      name: 'Feed',
      link: '/feed',
    },
    {
      name: 'Receitas',
      link: '/recipes',
    },
    {
      name: 'Perfil',
      link: '/profile',
    },
  ];

  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
