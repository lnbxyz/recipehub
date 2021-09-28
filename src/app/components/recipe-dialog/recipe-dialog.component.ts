import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/tokens';

@Component({
  selector: 'rh-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
})
export class RecipeDialogComponent implements OnInit {
  @Input() public closeSubject!: Subject<Recipe | undefined>;

  constructor() {}

  ngOnInit(): void {}

  public close(value?: Recipe): void {
    this.closeSubject.next(value);
  }
}
