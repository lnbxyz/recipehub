import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [CommonModule],
  exports: [ArticleListComponent],
})
export class ArticleModule {}
