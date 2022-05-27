import { Component, OnInit } from '@angular/core';
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
    private booksFactoryService: BooksFactoryService
  ) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  loadBooks() {
    this.booksFactoryService.getBooks().subscribe((result) => {
      this.books = result.map(this.booksFactoryService.transformBookApi)
    })
  }

}
