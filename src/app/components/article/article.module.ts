import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleCardComponent } from './card/article-card.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [ArticleListComponent, ArticleCardComponent],
  imports: [CommonModule],
  exports: [ArticleListComponent, ArticleCardComponent, DialogModule],
})
export class ArticleModule {}
