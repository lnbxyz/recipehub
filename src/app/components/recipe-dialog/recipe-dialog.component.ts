import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  selector: 'rh-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
})
export class RecipeDialogComponent implements OnInit {
  @Input() public closeSubject!: Subject<Recipe | undefined>;
  public recipes: Recipe[] = [];
  public isLoading = true;
  public hasError = false;
  public seachControl = new FormControl();
  private subscriptions = new SubscriptionManager();

  constructor(
    private recipeService: RecipeService,
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

  private getRecipes(searchTerm?: string): void {
    if (!this.userService.currentUser) {
      this.hasError = true;
      return;
    }

    this.hasError = false;
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
            this.hasError = true;
            this.isLoading = false;
          }
        )
    );
  }

  public close(value?: Recipe): void {
    this.closeSubject.next(value);
  }

  public onDialogClick(event: Event): void {
    event.stopPropagation();
  }
}
