import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorTableComponent } from './form/author/author-table/author-table.component';
import { BookTableComponent } from './form/book/book-table/book-table.component';
import { ReaderTableComponent } from './form/reader/reader-table/reader-table.component';

const routes: Routes = [
  {path: 'author', component: AuthorTableComponent},
  {path: 'book', component: BookTableComponent},
  {path: 'reader', component: ReaderTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
