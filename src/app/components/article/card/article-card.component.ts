import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/tokens';

@Component({
  selector: 'rh-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() article?: Article;

  constructor() {}

  ngOnInit(): void {}
}
