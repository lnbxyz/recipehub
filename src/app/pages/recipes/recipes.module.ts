import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [RecipesListComponent],
  imports: [CommonModule, RecipesRoutingModule],
})
export class RecipesModule {}
