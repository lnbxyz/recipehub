import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
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
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dialog: DialogService,
    public userService: UserService
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
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteButtonPressed(): void {
    if (!this.recipe) {
      return;
    }
    this.isLoading = true;
    this.subscriptions.add(
      'delete',
      this.recipeService.delete(this.recipe.id).subscribe(
        // Success
        () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        // Failure
        () => {
          this.isLoading = false;
          this.subscriptions.add(
            'error-dialog',
            this.dialog
              .open({
                message: 'Não foi possível apagar a receita',
                actions: [{ text: 'OK' }],
              })
              .subscribe()
          );
        }
      )
    );
  }
}
