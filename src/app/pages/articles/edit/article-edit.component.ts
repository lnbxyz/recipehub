import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { RecipeDialogService } from 'src/app/components/recipe-dialog/recipe-dialog.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { Article, ArticleRecipe, Recipe } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  public isLoading = true;
  public isCreating = false;
  public form!: FormGroup;
  public article?: Article;
  private subscriptions = new SubscriptionManager();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private dialog: DialogService,
    private userService: UserService,
    private recipeDialog: RecipeDialogService
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
          this.articleService.getById(ID).subscribe((article) => {
            if (article) {
              this.article = article;
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

  public get recipes(): FormArray {
    return this.form.get('recipes') as FormArray;
  }

  public addRecipe(recipe: Recipe): void {
    const recipeForm = this.fb.group({
      id: [undefined],
      articleId: [undefined],
      recipeId: [recipe.id],
      name: [recipe.name],
    });

    this.recipes.push(recipeForm);
    this.form.markAsDirty();
  }

  public onAddRecipeButtonPressed(): void {
    this.subscriptions.add(
      'recipe-dialog',
      this.recipeDialog.open().subscribe((result) => {
        if (result) {
          if (
            !this.recipes?.controls
              .map((g) => g.get('recipeId')?.value)
              .includes(result.id)
          ) {
            this.addRecipe(result);
          } else {
            this.showErrorDialog('Esta receita já foi adicionada!');
          }
        }
      })
    );
  }

  public onRemoveRecipeButtonPressed(index: number): void {
    this.recipes.removeAt(index);
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
      name: [this.article?.name, Validators.required],
      description: [this.article?.description],
      recipes: this.fb.array([], Validators.required),
    });

    this.article?.articleRecipes?.forEach((ar) => {
      this.recipes.push(
        this.fb.group({
          id: [ar.id],
          articleId: [ar.articleId],
          recipeId: [ar.recipeId],
          name: [
            this.article?.recipes?.find((r) => r.id === ar.recipeId)?.name ||
              'Ops! Esta receita não existe mais :(',
          ],
        })
      );
    });

    this.isLoading = false;
  }

  private create(): void {
    if (!this.userService.currentUser) {
      return;
    }

    const ID = uuidv4();

    this.subscriptions.add(
      'create',
      this.articleService
        .create({
          id: ID,
          userId: this.userService.currentUser?.id,
          name: this.form.get('name')?.value || null,
          description: this.form.get('description')?.value || null,
          articleRecipes: (this.recipes.value as Array<any>).map<ArticleRecipe>(
            (item: any) => {
              // remove name property
              return <ArticleRecipe>{
                id: uuidv4(),
                articleId: ID,
                recipeId: item.recipeId,
              };
            }
          ),
        })
        .subscribe(
          // Success
          () => {
            this.router.navigate(['articles', ID]);
          },
          // Failure
          () => {
            this.isLoading = false;
            this.showErrorDialog('Não foi possível criar o artigo');
          }
        )
    );
  }

  private update(): void {
    if (!this.article) {
      return;
    }

    this.subscriptions.add(
      'update',
      this.articleService
        .update({
          id: this.article.id,
          userId: this.article.userId,
          name: this.form.get('name')?.value,
          description: this.form.get('description')?.value || null,
          articleRecipes: (this.recipes.value as Array<any>).map<ArticleRecipe>(
            (item: any) => {
              // remove name property
              return <ArticleRecipe>{
                id: item.id || uuidv4(),
                articleId: this.article?.id,
                recipeId: item.recipeId,
              };
            }
          ),
        })
        .subscribe(
          // Success
          () => {
            this.router.navigate(['articles', this.article?.id]);
          },
          // Failure
          () => {
            this.isLoading = false;
            this.showErrorDialog('Não foi possivel editar o artigo');
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
