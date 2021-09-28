import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'rh-comments-sidebar',
  templateUrl: './comments-sidebar.component.html',
  styleUrls: ['./comments-sidebar.component.scss'],
})
export class CommentsSidebarComponent implements OnInit {
  @Input() public closeSubject!: Subject<void>;
  @Input() public articleId!: string;
  public comments: Comment[] = [];
  public isLoading = true;
  public hasError = false;
  public commentField = '';
  private subscriptions = new SubscriptionManager();

  constructor(
    private commentService: CommentService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    if (!this.userService.currentUser || !this.articleId) {
      this.hasError = true;
      return;
    }

    this.isLoading = true;
    this.subscriptions.add(
      'get-recipes',
      this.commentService.getByArticle(this.articleId).subscribe(
        // Success
        (comments) => {
          if (comments) {
            this.comments = comments.sort(
              (a, b) =>
                new Date(b.modifiedOn || b.createdOn || 0).getTime() -
                new Date(a.modifiedOn || a.createdOn || 0).getTime()
            );
          }
          this.isLoading = false;
        },
        // Failure
        () => {
          this.hasError = true;
          this.isLoading = false;
        }
      )
    );
  }

  public onAddCommentButtonPressed(): void {
    if (!this.userService.currentUser) {
      return;
    }

    this.isLoading = true;
    this.subscriptions.add(
      'create-comment',
      this.commentService
        .create({
          id: uuidv4(),
          articleId: this.articleId,
          body: this.commentField,
          userId: this.userService.currentUser?.id,
        })
        .subscribe(
          // Success
          () => {
            this.commentField = '';
            this.refresh();
          },
          // Error
          () => {
            this.hasError = true;
            this.isLoading = false;
          }
        )
    );
  }

  public close(): void {
    this.closeSubject.next();
  }

  public onSidebarClicked(event: Event): void {
    event.stopPropagation();
  }
}
