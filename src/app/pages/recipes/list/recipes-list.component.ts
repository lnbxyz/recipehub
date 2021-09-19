import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  zoop(e: any) {
    console.log(e);
  }
}
