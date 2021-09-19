import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { RecipeCardComponent } from './card/recipe-card.component';

@NgModule({
  declarations: [RecipesListComponent, RecipeCardComponent],
  imports: [CommonModule, RecipesRoutingModule, ButtonModule],
})
export class RecipesModule {}
