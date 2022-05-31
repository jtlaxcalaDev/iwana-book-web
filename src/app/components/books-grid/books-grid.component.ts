import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component'
import { Book } from '../../model/books/books'
import { BooksFactoryService } from '../../services/books-factory.service'

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
    'pages',
    'editorial',
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
    this.addBook()
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

}
