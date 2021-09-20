import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { RecipeCardComponent } from './card/recipe-card.component';
import { TagModule } from 'src/app/components/tag/tag.module';
import { RecipeDetailComponent } from './detail/recipe-detail.component';
import { RecipeEditComponent } from './edit/recipe-edit.component';

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
  ],
  imports: [CommonModule, RecipesRoutingModule, ButtonModule, TagModule],
})
export class RecipesModule {}
