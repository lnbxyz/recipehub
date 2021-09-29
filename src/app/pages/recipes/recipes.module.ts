import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { RecipeCardComponent } from './card/recipe-card.component';
import { TagModule } from 'src/app/components/tag/tag.module';
import { RecipeDetailComponent } from './detail/recipe-detail.component';
import { RecipeEditComponent } from './edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/components/dialog/dialog.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { EmptyMessageModule } from 'src/app/components/empty-message/empty-message.module';

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    ButtonModule,
    TagModule,
    DialogModule,
    LoadingModule,
    EmptyMessageModule,
  ],
})
export class RecipesModule {}
