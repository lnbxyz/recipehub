import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { Article } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'rh-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() userId?: string;

  public articles: Article[] = [];
  public isLoading = true;
  private subscriptions = new SubscriptionManager();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private dialog: DialogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public onCreateButtonPressed(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public onCardPressed(article: Article): void {
    if (!article.id) {
      return;
    }
    this.router.navigate([article.id], { relativeTo: this.route });
  }

  private getArticles(): void {
    if (!this.userService.currentUser) {
      return;
    }

    const request = this.userId
      ? this.articleService.getByUser(this.userService.currentUser.id)
      : this.articleService.getAll();

    this.isLoading = true;
    this.subscriptions.add(
      'get-articles',
      request.subscribe(
        // Success
        (articles) => {
          if (articles) {
            this.articles = articles;
          }
          this.isLoading = false;
        },
        // Failure
        () => {
          this.isLoading = false;
          this.showErrorDialog('Não foi possível carregar o feed');
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
          actions: [
            { text: 'Voltar' },
            {
              text: 'Tentar novamente',
              type: 'primary',
              value: 'tryAgain',
            },
          ],
        })
        .subscribe((result) => {
          if (result === 'tryAgain') {
            this.getArticles();
          }
        })
    );
  }
}
