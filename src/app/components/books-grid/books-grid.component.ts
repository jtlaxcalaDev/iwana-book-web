import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component'
import { Book } from '../../model/books/books'
import { BooksFactoryService } from '../../services/books-factory.service'
import { BookFormEditComponent } from '../book-form-edit/book-form-edit.component'
import { BookDeleteDialogComponent } from '../book-delete-dialog/book-delete-dialog.component';

@Component({
  selector: 'app-books-grid',
  templateUrl: './books-grid.component.html',
  styleUrls: ['./books-grid.component.css']
})
export class BooksGridComponent implements OnInit {
  books: Book[] = []
  displayedColumns: string[] = [
    'id',
    'title',
    'authors',
    'pages',
    'editorial',
    'categories',
    'isbn',
    'price',
    'sinopsis',
    'pubYear',
    'edit',
    'delete'
  ]

  constructor(
    public dialog: MatDialog,
    private booksFactoryService: BooksFactoryService
  ) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  addBook() {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.loadBooks()
    })
  }

  loadBooks() {
    this.booksFactoryService.getBooks().subscribe((result) => {
      this.books = result.map(this.booksFactoryService.transformBookApi)
    })
  }

  editBook(book: Book) {
    const dialogRef = this.dialog.open(BookFormEditComponent, {
      width: '700px',
      panelClass: 'custom-dialog-container',
      data: {
        ...book
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.loadBooks()
    })
  }

  deleteBook(book: Book) {
    const dialogRef = this.dialog.open(BookDeleteDialogComponent, {
      width: '450px',
      panelClass: 'custom-dialog-container',
      data: {
        id: book.id,
        title: book.title
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.loadBooks()
    })
  }

}
