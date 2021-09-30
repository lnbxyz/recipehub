import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, debounceTime } from 'rxjs/operators';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  public isLoading = true;
  public seachControl = new FormControl();
  private subscriptions = new SubscriptionManager();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dialog: DialogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    this.subscriptions.add(
      'search-value-changes',
      this.seachControl.valueChanges
        .pipe(debounceTime(250))
        .subscribe((value) => {
          this.getRecipes(value);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public onCreateButtonPressed(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public onRecipeCardPressed(recipe: Recipe): void {
    if (!recipe.id) {
      return;
    }
    this.router.navigate([recipe.id], { relativeTo: this.route });
  }

  private getRecipes(searchTerm?: string): void {
    if (!this.userService.currentUser) {
      return;
    }
    this.isLoading = true;
    this.subscriptions.add(
      'get-recipes',
      this.recipeService
        .getByUser({
          userId: this.userService.currentUser.id,
          searchTerm,
        })
        .subscribe(
          // Success
          (recipes) => {
            if (recipes) {
              this.recipes = recipes;
            }
            this.isLoading = false;
          },
          // Failure
          () => {
            this.isLoading = false;
            this.showErrorDialog(
              'Não foi possível carregar a lista de receitas'
            );
          }
        )
    );
  }

  private showErrorDialog(message: string): void {
    this.subscriptions.add(
      'error-dialog',
      this.dialog
        .open({
          message: message,
          actions: [
            { text: 'Voltar' },
            {
              text: 'Tentar novamente',
              type: 'primary',
              value: 'tryAgain',
            },
          ],
        })
        .subscribe((result) => {
          if (result === 'tryAgain') {
            this.getRecipes();
          }
        })
    );
  }
}
