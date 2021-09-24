import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailsComponent } from './details/profile-details.component';
import { ProfileEditComponent } from './edit/profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailsComponent,
  },
  {
    path: 'edit',
    component: ProfileEditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
