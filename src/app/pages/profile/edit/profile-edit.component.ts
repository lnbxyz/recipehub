import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  selector: 'rh-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public form!: FormGroup;
  private subscriptions = new SubscriptionManager();

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.userService.currentUser?.name, Validators.required],
      email: [
        this.userService.currentUser?.email,
        [Validators.required, Validators.email],
      ],
      username: [this.userService.currentUser?.username, Validators.required],
      password: [this.userService.currentUser?.password, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public canSave(): boolean {
    return this.form.dirty && this.form.valid;
  }

  public onSaveButtonPressed(): void {
    if (!this.canSave || !this.userService.currentUser) {
      return;
    }

    this.isLoading = true;

    this.subscriptions.add(
      'update',
      this.userService
        .update({
          id: this.userService.currentUser?.id,
          name: this.form.get('name')?.value,
          email: this.form.get('email')?.value,
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value,
        })
        .subscribe(
          // Success
          () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          // Failure
          () => {
            this.isLoading = false;
            // TODO implement better error handling
            alert('Não foi possível alterar as informações do usuário');
          }
        )
    );
  }
}
