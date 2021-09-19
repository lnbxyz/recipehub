import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/tokens';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private getAllSubscription: Subscription;

  constructor(private recipeService: RecipeService) {
    this.getAllSubscription = this.recipeService
      .getAll()
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe();
  }

  zoop(e: any) {
    console.log(e);
  }
}
