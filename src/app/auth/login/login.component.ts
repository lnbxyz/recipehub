import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';

@Component({
  selector: 'rh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public form!: FormGroup;
  private subscriptions = new SubscriptionManager();
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public login(): void {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;

    this.subscriptions.add(
      'login',
      this.userService
        .login({
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value,
        })
        .subscribe(
          // Success
          () => {
            // Handled by service
          },
          // Failure
          () => {
            this.isLoading = false;
            // TODO implement better error handling
            alert('Não foi possível realizar o login');
          }
        )
    );
  }
}
