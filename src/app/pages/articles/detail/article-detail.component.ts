import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { Article, replaceNewLine } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  public article?: Article;
  public isLoading = true;
  private subscriptions = new SubscriptionManager();

  public get likeCaption(): string {
    if (this.article?.likeCount) {
      return this.article?.likeCount?.toString();
    }
    return 'Like';
  }

  public get commentCaption(): string {
    if (this.article?.commentCount) {
      return this.article?.commentCount?.toString();
    }
    return 'Comentar';
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private dialog: DialogService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    if (ID) {
      this.subscriptions.add(
        'get-details',
        this.articleService.getById(ID).subscribe((article) => {
          if (article) {
            this.article = article;
          }
          this.isLoading = false;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public onEditButtonPressed(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteButtonPressed(): void {
    if (!this.article) {
      return;
    }
    this.isLoading = true;
    this.subscriptions.add(
      'delete',
      this.articleService.delete(this.article.id).subscribe(
        // Success
        () => {
          console.log('deleted');
          // TODO figure out where to go from here
          // this.router.navigate(['../'], { relativeTo: this.route });
        },
        // Failure
        () => {
          this.isLoading = false;
          this.subscriptions.add(
            'error-dialog',
            this.dialog
              .open({
                message: 'Não foi possível apagar a receita',
                actions: [{ text: 'OK' }],
              })
              .subscribe()
          );
        }
      )
    );
  }

  public replaceNewLine(text?: string): Array<string> {
    return replaceNewLine(text);
  }
}
