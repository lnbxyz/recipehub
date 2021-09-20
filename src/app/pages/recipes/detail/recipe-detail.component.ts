import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe?: Recipe;
  public isLoading = true;
  private subscriptions = new SubscriptionManager();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    if (ID) {
      this.subscriptions.add(
        'get-details',
        this.recipeService.getById(ID).subscribe((recipe) => {
          if (recipe) {
            this.recipe = recipe;
          }
          this.isLoading = false;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public onEditButtonPressed(): void {
    // TODO
    console.log('edit button pressed');
  }

  public onDeleteButtonPressed(): void {
    // TODO
    console.log('delete button pressed');
  }
}
