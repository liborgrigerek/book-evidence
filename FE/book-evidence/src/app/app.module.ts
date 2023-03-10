import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthorTableComponent } from './form/author/author-table/author-table.component';
import { EditAuthorComponent } from './form/author/edit-author/edit-author.component';
import { DeleteAuthorComponent } from './form/author/delete-author/delete-author.component';
import { MessageComponent, MessageDialog } from './form/message/message.component';
import { BookTableComponent } from './form/book/book-table/book-table.component';
import { DeleteBookComponent } from './form/book/delete-book/delete-book.component';
import { EditBookComponent } from './form/book/edit-book/edit-book.component';
import { ReaderTableComponent } from './form/reader/reader-table/reader-table.component';
import { DeleteReaderComponent } from './form/reader/delete-reader/delete-reader.component';
import { EditReaderComponent } from './form/reader/edit-reader/edit-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorTableComponent,
    EditAuthorComponent,
    DeleteAuthorComponent,
    MessageComponent,
    MessageDialog,
    BookTableComponent,
    DeleteBookComponent,
    EditBookComponent,
    ReaderTableComponent,
    DeleteReaderComponent,
    EditReaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
