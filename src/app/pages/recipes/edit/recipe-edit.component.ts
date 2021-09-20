import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/tokens';

@Component({
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  public isCreating = false;
  public form!: FormGroup;
  public recipe?: Recipe;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    if (!ID) this.isCreating = true;
    this.initForm();
  }

  public onCancelButtonPressed(): void {
    // TODO
    console.log('cancel button pressed');
  }

  public onSaveButtonPressed(): void {
    // TODO
    console.log('save button pressed');
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
}
