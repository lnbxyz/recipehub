import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './detail/article-detail.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { DialogModule } from 'src/app/components/dialog/dialog.module';
import { InteractionButtonModule } from 'src/app/components/interaction-button/interaction-button.module';
import { ArticleEditComponent } from './edit/article-edit.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleDetailComponent, ArticleEditComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    InteractionButtonModule,
    LoadingModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class ArticlesPageModule {}
