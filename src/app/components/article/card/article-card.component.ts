import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { Article } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'rh-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() public article?: Article;
  private subscriptions = new SubscriptionManager();

  public get caption(): string {
    if (this.article?.likeCount) {
      return this.article?.likeCount?.toString();
    }
    return 'Like';
  }

  constructor(
    private articleService: ArticleService,
    private dialog: DialogService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  public onLikeButtonPressed(): void {
    this.article?.isLiked ? this.dislike() : this.like();
  }

  private like(): void {
    if (!this.article || !this.userService.currentUser) {
      return;
    }

    this.subscriptions.add(
      'like',
      this.articleService
        .like(this.article.id, this.userService.currentUser.id)
        .subscribe(
          // Success
          () => {
            if (!this.article) {
              return;
            }

            if (!this.article.likeCount) {
              this.article.likeCount = 0;
            }

            this.article.likeCount++;
            this.article.isLiked = true;
          },
          // Failure
          () => {
            this.showErrorDialog('Não foi possível adicionar o like ao artigo');
          }
        )
    );
  }

  private dislike(): void {
    if (!this.article || !this.userService.currentUser) {
      return;
    }

    this.subscriptions.add(
      'dislike',
      this.articleService
        .dislike(this.article.id, this.userService.currentUser.id)
        .subscribe(
          // Success
          () => {
            if (!this.article) {
              return;
            }

            if (!this.article.likeCount) {
              this.article.likeCount = 0;
            }

            this.article.likeCount--;
            this.article.isLiked = false;
          },
          // Failure
          () => {
            this.showErrorDialog('Não foi possível remover o like');
          }
        )
    );
  }

  private showErrorDialog(message: string): void {
    this.subscriptions.add(
      'error-dialog',
      this.dialog
        .open({
          message: message,
          actions: [{ text: 'OK' }],
        })
        .subscribe()
    );
  }
}
