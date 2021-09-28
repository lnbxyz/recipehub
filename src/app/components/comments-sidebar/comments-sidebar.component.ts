import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/tokens';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

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
  private subscriptions = new SubscriptionManager();

  constructor(
    private commentService: CommentService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
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
            this.comments = comments;
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

  public close(): void {
    this.closeSubject.next();
  }

  public onSidebarClicked(event: Event): void {
    event.stopPropagation();
  }
}
