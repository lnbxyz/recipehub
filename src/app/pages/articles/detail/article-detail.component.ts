import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsSidebarService } from 'src/app/components/comments-sidebar/comments-sidebar.service';
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
  public deletedRecipes: string[] = [];
  public expandedRecipes: string[] = [];
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
    private commentsSidebar: CommentsSidebarService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.isLoading = true;
    const ID = this.route.snapshot.paramMap.get('id');
    if (ID) {
      this.subscriptions.add(
        'get-details',
        this.articleService
          .getById({
            articleId: ID,
            userId: this.userService.currentUser?.id,
          })
          .subscribe((article) => {
            if (article) {
              this.article = article;
            }
            this.article?.articleRecipes?.forEach((ar) => {
              if (!this.article?.recipes?.find((r) => r.id === ar.recipeId)) {
                this.deletedRecipes.push(ar.recipeId);
              }
            });
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
          this.router.navigate(['feed']);
        },
        // Failure
        () => {
          this.isLoading = false;
          this.subscriptions.add(
            'error-dialog',
            this.dialog
              .open({
                message: 'Não foi possível apagar o artigo',
                actions: [{ text: 'OK' }],
              })
              .subscribe()
          );
        }
      )
    );
  }

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

  public replaceNewLine(text?: string): Array<string> {
    return replaceNewLine(text);
  }

  public isExpanded(recipeId: string): boolean {
    return this.expandedRecipes.includes(recipeId);
  }

  public toggleExpanded(recipeId: string): void {
    if (this.isExpanded(recipeId)) {
      this.expandedRecipes = this.expandedRecipes.filter(
        (element) => element !== recipeId
      );
    } else {
      this.expandedRecipes.push(recipeId);
    }
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

  public onCommentButtonPressed(): void {
    if (!this.article) {
      return;
    }

    this.subscriptions.add(
      'comments-sidebar',
      this.commentsSidebar
        .open({
          articleId: this.article?.id,
        })
        .subscribe(() => {
          this.refresh();
        })
    );
  }
}
