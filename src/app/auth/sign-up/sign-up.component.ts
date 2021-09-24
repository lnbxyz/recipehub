import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionManager } from 'src/app/tokens/classes/subscription-manager.class';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'rh-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public form!: FormGroup;
  private subscriptions = new SubscriptionManager();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.clear();
  }

  public create(): void {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;

    this.subscriptions.add(
      'create',
      this.userService
        .create({
          id: uuidv4(),
          name: this.form.get('name')?.value,
          email: this.form.get('email')?.value,
          username: this.form.get('username')?.value,
          password: this.form.get('password')?.value,
        })
        .subscribe(
          // Success
          () => {
            this.login({
              username: this.form.get('username')?.value,
              password: this.form.get('password')?.value,
            });
          },
          // Failure
          () => {
            this.isLoading = false;
            this.showErrorDialog('Não foi possível criar o usuário');
          }
        )
    );
  }

  private login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): void {
    this.subscriptions.add(
      'login',
      this.userService
        .login({
          username: username,
          password: password,
        })
        .subscribe({
          error: () => {
            this.subscriptions.add(
              'error-dialog',
              this.dialog
                .open({
                  message:
                    'Não foi possível realizar o login após criar a conta',
                  actions: [{ text: 'OK' }],
                })
                .subscribe(() => {
                  this.router.navigate(['auth']);
                })
            );
          },
        })
    );
  }

  private showErrorDialog(message: string): void {
    this.subscriptions.add(
      'error-dialog',
      this.dialog
        .open({
          message: message,
          actions: [{ text: 'OK' }],
        })
        .subscribe()
    );
  }
}
