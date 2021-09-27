import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'rh-interaction-button',
  templateUrl: './interaction-button.component.html',
  styleUrls: ['./interaction-button.component.scss'],
})
export class InteractionButtonComponent implements OnInit {
  @Input() public icon?: string;
  @Input() public caption?: string;
  @Input() public interacted? = false;
  @HostBinding('style.--rh-interaction-button-color')
  @Input()
  public color?: string;
  @Output() public onClick = new EventEmitter();

  public get classes(): string {
    return `fa${this.interacted ? 's' : 'r'} fa-${this.icon}`;
  }

  constructor() {}

  ngOnInit(): void {}

  public onIconPressed(event: Event): void {
    event.stopPropagation();
    this.onClick.emit();
  }
}
