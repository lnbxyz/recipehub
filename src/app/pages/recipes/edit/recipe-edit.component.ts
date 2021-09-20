import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isCreating = false;
  public form!: FormGroup;
  public recipe?: Recipe;
  private subscriptions = new SubscriptionManager();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    if (!ID) {
      this.isCreating = true;
      this.isLoading = false;
      this.initForm();
    } else {
      if (ID) {
        this.subscriptions.add(
          'get-details',
          this.recipeService.getById(ID).subscribe((recipe) => {
            if (recipe) {
              this.recipe = recipe;
            }
            this.isLoading = false;
            this.initForm();
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public onSaveButtonPressed(): void {
    this.isLoading = true;
    if (this.isCreating) {
      this.create();
    } else {
      this.update();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [this.recipe?.name, Validators.required],
      description: [this.recipe?.description],
      servings: [this.recipe?.steps],
      time: [this.recipe?.time],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
    });
  }

  private create(): void {
    this.subscriptions.add(
      'get-details',
      this.recipeService
        .create({
          id: uuidv4(),
          name: this.form.get('name')?.value,
          description: this.form.get('description')?.value,
          servings: this.form.get('servings')?.value,
          time: this.form.get('time')?.value,
          // ingredients: null, // TODO
          // steps: null, // TODO
          // tags: null, // TODO
        })
        .subscribe(
          // Success
          (result) => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          // Failure
          (error) => {
            // TODO
            console.log('could not create recipe');
          }
        )
    );
  }

  private update(): void {
    this.subscriptions.add(
      'get-details',
      this.recipeService
        .update({
          id: this.recipe?.id,
          name: this.form.get('name')?.value,
          description: this.form.get('description')?.value,
          servings: this.form.get('servings')?.value,
          time: this.form.get('time')?.value,
          // ingredients: null, // TODO
          // steps: null, // TODO
          // tags: null, // TODO
        })
        .subscribe(
          // Success
          (result) => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          // Failure
          (error) => {
            // TODO
            console.log('could not update recipe');
          }
        )
    );
  }
}
