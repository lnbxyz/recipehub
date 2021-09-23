import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogAction } from 'src/app/tokens';

@Component({
  selector: 'rh-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() public message?: string;
  @Input() public actions: DialogAction[] = [];
  @Input() public closeSubject!: Subject<string | undefined>;

  constructor() {}

  ngOnInit(): void {}

  public close(value?: string): void {
    this.closeSubject.next(value);
  }
}
