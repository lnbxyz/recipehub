import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
  private subscriptions = new SubscriptionManager();

  constructor(
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.userService.currentUser) {
      this.hasError = true;
      return;
    }

    this.isLoading = true;
    this.subscriptions.add(
      'get-recipes',
      this.recipeService
        .getByUser({
          userId: this.userService.currentUser.id,
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
}
