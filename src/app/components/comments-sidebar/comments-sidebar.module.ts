import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsSidebarComponent } from './comments-sidebar.component';
import { ButtonModule } from '../button/button.module';
import { EmptyMessageModule } from '../empty-message/empty-message.module';
import { LoadingModule } from '../loading/loading.module';
import { CommentsSidebarService } from './comments-sidebar.service';

@NgModule({
  declarations: [CommentsSidebarComponent],
  imports: [CommonModule, ButtonModule, EmptyMessageModule, LoadingModule],
  providers: [CommentsSidebarService],
})
export class CommentsSidebarModule {}
