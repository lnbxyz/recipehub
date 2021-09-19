import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private subscriptions = new SubscriptionManager();

  constructor(private recipeService: RecipeService) {
    this.subscriptions.add(
      'get-all',
      this.recipeService.getAll().subscribe((recipes) => {
        this.recipes = recipes;
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  zoop(e: any) {
    console.log(e);
  }
}
