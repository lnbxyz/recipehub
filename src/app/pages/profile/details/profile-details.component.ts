import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'rh-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  public onEditInfoButtonPressed(): void {
    // TODO
  }
}
