import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FeedRoutingModule } from './feed-routing.module';
import { ArticleModule } from 'src/app/components/article/article.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, FeedRoutingModule, ArticleModule, ButtonModule],
})
export class FeedModule {}
