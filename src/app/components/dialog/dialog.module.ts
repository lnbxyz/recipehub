import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, ButtonModule],
  providers: [DialogService],
})
export class DialogModule {}
