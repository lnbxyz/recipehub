import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './details/profile-details.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ProfileEditComponent } from './edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/components/dialog/dialog.module';

@NgModule({
  declarations: [ProfileDetailsComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ButtonModule,
    DialogModule,
  ],
})
export class ProfileModule {}
