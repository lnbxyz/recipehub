import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FeedRoutingModule } from './feed-routing.module';
import { ArticleModule } from 'src/app/components/article/article.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, FeedRoutingModule, ArticleModule],
})
export class FeedModule {}
