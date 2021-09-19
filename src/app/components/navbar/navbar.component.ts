import { Component, OnInit } from '@angular/core';

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
      name: 'Minhas Receitas',
      link: '/recipes',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}