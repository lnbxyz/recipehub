import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      this.initForm();
    } else {
      if (ID) {
        this.subscriptions.add(
          'get-details',
          this.recipeService.getById(ID).subscribe((recipe) => {
            if (recipe) {
              this.recipe = recipe;
            }
            this.initForm();
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  public onAddIngredientButtonPressed(): void {
    const ingredientForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
    });

    this.ingredients.push(ingredientForm);
  }

  public onAddStepButtonPressed(): void {
    const stepForm = this.fb.group({
      // order: ['', Validators.required], // TODO
      description: ['', Validators.required],
    });

    this.steps.push(stepForm);
  }

  public onRemoveIngredientButtonPressed(index: number): void {
    this.ingredients.removeAt(index);
  }

  public onRemoveStepButtonPressed(index: number): void {
    this.steps.removeAt(index);
  }

  public canSave(): boolean {
    return this.form.dirty && this.form.valid;
  }

  public onSaveButtonPressed(): void {
    if (!this.canSave()) {
      return;
    }
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

    this.isLoading = false;
  }

  private create(): void {
    this.subscriptions.add(
      'create',
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
    if (!this.recipe) {
      return;
    }
    this.subscriptions.add(
      'update',
      this.recipeService
        .update({
          id: this.recipe.id,
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
