import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './details/profile-details.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';

@NgModule({
  declarations: [ProfileDetailsComponent],
  imports: [CommonModule, ProfileRoutingModule, ButtonModule],
})
export class ProfileModule {}
