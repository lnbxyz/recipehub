import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/tokens';

@Component({
  selector: 'rh-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() public recipe?: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
