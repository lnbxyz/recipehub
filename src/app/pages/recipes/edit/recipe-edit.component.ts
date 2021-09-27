import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { Ingredient, Recipe, Step } from 'src/app/tokens';
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
    private recipeService: RecipeService,
    private dialog: DialogService,
    private userService: UserService
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
      quantity: [''],
      unit: [''],
    });

    this.ingredients.push(ingredientForm);
  }

  public onAddStepButtonPressed(): void {
    const stepForm = this.fb.group({
      description: ['', Validators.required],
    });

    this.steps.push(stepForm);
  }

  public onRemoveIngredientButtonPressed(index: number): void {
    this.ingredients.removeAt(index);
    this.form.markAsDirty();
  }

  public onRemoveStepButtonPressed(index: number): void {
    this.steps.removeAt(index);
    this.form.markAsDirty();
  }

  public canSave(): boolean {
    return this.form.dirty && this.form.valid;
  }

  public onSaveButtonPressed(): void {
    console.log();
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
      ingredients: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
    });

    this.recipe?.ingredients?.forEach((ingredient) => {
      this.ingredients.push(
        this.fb.group({
          name: [ingredient.name, Validators.required],
          quantity: [ingredient.quantity],
          unit: [ingredient.unit],
        })
      );
    });

    this.recipe?.steps?.forEach((step) => {
      this.steps.push(
        this.fb.group({
          description: [step.description, Validators.required],
        })
      );
    });

    this.isLoading = false;
  }

  private create(): void {
    if (!this.userService.currentUser) {
      return;
    }

    this.subscriptions.add(
      'create',
      this.recipeService
        .create({
          id: uuidv4(),
          userId: this.userService.currentUser?.id,
          name: this.form.get('name')?.value || null,
          description: this.form.get('description')?.value || null,
          servings: this.form.get('servings')?.value || null,
          time: this.form.get('time')?.value || null,
          ingredients: (this.ingredients.value as Ingredient[]).map<Ingredient>(
            (ingredient: Ingredient) => {
              return ({
                id: uuidv4(),
                quantity: ingredient.quantity || null,
                unit: ingredient.unit || null,
                name: ingredient.name
              });
            }
          ),
          steps: (this.steps.value as Step[]).map<Step>(
            (step: Step, index: number) => {
              return { ...step, order: index, id: uuidv4() };
            }
          ),
          // tags: null, // TODO
        })
        .subscribe(
          // Success
          () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          // Failure
          () => {
            this.isLoading = false;
            this.showErrorDialog('Não foi possível criar a receita');
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
          userId: this.recipe.userId,
          name: this.form.get('name')?.value,
          description: this.form.get('description')?.value || null,
          servings: this.form.get('servings')?.value || null,
          time: this.form.get('time')?.value || null,
          ingredients: (this.ingredients.value as Ingredient[]).map<Ingredient>(
            (ingredient: Ingredient) => {
              return ({
                id: ingredient.id || uuidv4(),
                quantity: ingredient.quantity || null,
                unit: ingredient.unit || null,
                name: ingredient.name
              });
            }
          ),
          steps: (this.steps.value as Step[]).map<Step>(
            (step: Step, index: number) => {
              return { ...step, order: index, id: step.id || uuidv4() };
            }
          ),
          // tags: null, // TODO
        })
        .subscribe(
          // Success
          () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          // Failure
          () => {
            this.isLoading = false;
            this.showErrorDialog('Não foi possivel editar a receita');
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
          actions: [{ text: 'OK' }],
        })
        .subscribe()
    );
  }
}
