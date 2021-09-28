import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './detail/article-detail.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { DialogModule } from 'src/app/components/dialog/dialog.module';
import { InteractionButtonModule } from 'src/app/components/interaction-button/interaction-button.module';

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    InteractionButtonModule,
    LoadingModule,
    DialogModule,
  ],
})
export class ArticlesPageModule {}
