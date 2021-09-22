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
  @Input() public disabled = false;
  @Input() public type: 'primary' | 'secondary' = 'primary';
  @Input() public icon: string = '';
  @Input() public sizing: 'fit' | 'fill' = 'fit';
  @HostBinding('style.--rh-button-color')
  @Input()
  public color: string = '';
  @Output() public onClick = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}
}
