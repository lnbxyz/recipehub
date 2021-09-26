import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleCardComponent } from './card/article-card.component';
import { DialogModule } from '../dialog/dialog.module';
import { InteractionButtonModule } from '../interaction-button/interaction-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ArticleListComponent, ArticleCardComponent],
  imports: [CommonModule, InteractionButtonModule, DialogModule, RouterModule],
  exports: [ArticleListComponent, ArticleCardComponent],
})
export class ArticleModule {}
