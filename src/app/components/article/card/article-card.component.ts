import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/tokens';

@Component({
  selector: 'rh-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() public article?: Article;

  public get caption(): string {
    if (this.article?.likeCount) {
      return this.article?.likeCount?.toString();
    }
    return 'Like';
  }

  constructor() {}

  ngOnInit(): void {}
}
