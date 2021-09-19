import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rh-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public icon: string = '';
  @Output() public onClick = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}
}
