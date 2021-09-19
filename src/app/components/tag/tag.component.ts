import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rh-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() public name: string = '';

  @HostBinding('style.--rh-tag-color')
  @Input()
  public color?: string = '';

  constructor() {}

  ngOnInit(): void {}
}
