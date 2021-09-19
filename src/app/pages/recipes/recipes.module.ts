import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { RecipeCardComponent } from './card/recipe-card.component';
import { TagModule } from 'src/app/components/tag/tag.module';

@NgModule({
  declarations: [RecipesListComponent, RecipeCardComponent],
  imports: [CommonModule, RecipesRoutingModule, ButtonModule, TagModule],
})
export class RecipesModule {}
