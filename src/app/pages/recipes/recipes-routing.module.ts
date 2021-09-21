import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './detail/recipe-detail.component';
import { RecipeEditComponent } from './edit/recipe-edit.component';
import { RecipesListComponent } from './list/recipes-list.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesListComponent,
  },
  {
    path: 'new',
    component: RecipeEditComponent,
  },
  {
    path: ':id',
    component: RecipeDetailComponent,
  },
  {
    path: ':id/edit',
    component: RecipeEditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
