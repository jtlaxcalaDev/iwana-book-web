/*app.module.ts */
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BooksGridComponent } from './components/books-grid/books-grid.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookFormEditComponent } from './components/book-form-edit/book-form-edit.component';
import { BookDeleteDialogComponent } from './components/book-delete-dialog/book-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksGridComponent,
    BookFormComponent,
    BookFormEditComponent,
    BookDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
