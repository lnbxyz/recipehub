import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  selector: 'rh-comments-sidebar',
  templateUrl: './comments-sidebar.component.html',
  styleUrls: ['./comments-sidebar.component.scss'],
})
export class CommentsSidebarComponent implements OnInit {
  @Input() public closeSubject!: Subject<void>;
  // public comments: Comment[] = [];
  public isLoading = true;
  public hasError = false;
  private subscriptions = new SubscriptionManager();

  constructor(
    // private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.userService.currentUser) {
      this.hasError = true;
      return;
    }

    // this.isLoading = true;
    // this.subscriptions.add(
    //   'get-recipes',
    //   this.recipeService.getByUser(this.userService.currentUser.id).subscribe(
    //     // Success
    //     (recipes) => {
    //       if (recipes) {
    //         this.recipes = recipes;
    //       }
    //       this.isLoading = false;
    //     },
    //     // Failure
    //     () => {
    //       this.hasError = true;
    //       this.isLoading = false;
    //     }
    //   )
    // );
  }

  public close(): void {
    this.closeSubject.next();
  }

  public onSidebarClicked(event: Event): void {
    event.stopPropagation();
  }
}
