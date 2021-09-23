import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
