import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onCreateArticleButtonPressed(): void {
    this.router.navigate(['articles', 'new']);
  }
}
