import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './list/article-list.component';
import { ArticleCardComponent } from './card/article-card.component';
import { DialogModule } from '../dialog/dialog.module';
import { InteractionButtonModule } from '../interaction-button/interaction-button.module';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { EmptyMessageModule } from 'src/app/components/empty-message/empty-message.module';

@NgModule({
  declarations: [ArticleListComponent, ArticleCardComponent],
  imports: [CommonModule, InteractionButtonModule, DialogModule, RouterModule, LoadingModule, EmptyMessageModule],
  exports: [ArticleListComponent, ArticleCardComponent],
})
export class ArticleModule {}
