import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDialogComponent } from './recipe-dialog.component';
import { RecipeDialogService } from './recipe-dialog.service';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [RecipeDialogComponent],
  imports: [CommonModule, ButtonModule],
  providers: [RecipeDialogService],
})
export class RecipeDialogModule {}
