import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './detail/article-detail.component';
import { ArticleEditComponent } from './edit/article-edit.component';

const routes: Routes = [
  {
    path: 'new',
    component: ArticleEditComponent,
  },
  {
    path: ':id',
    component: ArticleDetailComponent,
  },
  {
    path: ':id/edit',
    component: ArticleEditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
