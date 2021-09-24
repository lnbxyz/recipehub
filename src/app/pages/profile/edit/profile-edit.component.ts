import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
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
    private route: ActivatedRoute,
    private dialog: DialogService
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
            this.showErrorDialog(
              'Não foi possível alterar as informações do usuário'
            );
          }
        )
    );
  }

  public onDeleteButtonPressed(): void {
    this.subscriptions.add(
      'delete-dialog',
      this.dialog
        .open({
          message: 'Esta ação não pode ser revertida',
          actions: [
            {
              text: 'Voltar',
            },
            {
              text: 'Apagar mesmo assim',
              value: 'confirm',
              type: 'primary',
              icon: 'trash',
              color: 'var(--rh-color-red)',
            },
          ],
        })
        .subscribe((result) => {
          if (result === 'confirm') {
            this.delete();
          }
        })
    );
  }

  private delete(): void {
    if (!this.userService.currentUser) {
      return;
    }

    this.isLoading = true;

    this.subscriptions.add(
      'delete',
      this.userService.delete(this.userService.currentUser?.id).subscribe({
        error: () => {
          this.isLoading = false;
          this.showErrorDialog('Não foi possível apagar o usuário');
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
