import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDialogComponent } from './recipe-dialog.component';
import { RecipeDialogService } from './recipe-dialog.service';
import { ButtonModule } from '../button/button.module';
import { EmptyMessageModule } from '../empty-message/empty-message.module';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [RecipeDialogComponent],
  imports: [CommonModule, ButtonModule, EmptyMessageModule, LoadingModule],
  providers: [RecipeDialogService],
})
export class RecipeDialogModule {}
