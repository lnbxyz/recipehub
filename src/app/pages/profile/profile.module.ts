import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './details/profile-details.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileDetailsComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
