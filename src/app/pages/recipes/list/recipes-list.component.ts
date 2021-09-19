import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  public isLoading = true;
  private subscriptions = new SubscriptionManager();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public onCreateButtonPressed(): void {
    // TODO
    console.log('create button pressed');
  }

  public onRecipeCardPressed(recipe: Recipe): void {
    if (!recipe.id) {
      return;
    }
    this.router.navigate([recipe.id], { relativeTo: this.route });
  }

  private getRecipes(): void {
    this.isLoading = true;
    this.subscriptions.add(
      'get-recipes',
      this.recipeService.getAll().subscribe((recipes) => {
        if (recipes) {
          this.recipes = recipes;
        }
        this.isLoading = false;
      })
    );
  }
}
