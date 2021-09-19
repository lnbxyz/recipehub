import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'rh-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public type: 'primary' | 'secondary' = 'primary';

  @HostBinding('style.--rh-button-color')
  @Input()
  public color: string = '';

  @Input() public icon: string = '';

  @Output() public onClick = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}
}
