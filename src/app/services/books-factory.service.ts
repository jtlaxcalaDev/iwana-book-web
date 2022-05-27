/*books-factory.service.ts*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book, BookApi } from '../model/books/books'

@Injectable({
  providedIn: 'root'
})
export class BooksFactoryService {
  BASE_URL = `/api/books`

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<BookApi[]>(this.BASE_URL)
  }

  transformBookApi(bookApi: BookApi): Book {
    return {
      id: bookApi.id,
      title: bookApi.title,
      pages: bookApi.pages,
      editorial: bookApi.editorial,
      isbn: bookApi.isbn,
      price: bookApi.price.toFixed(2),
      sinopsis: bookApi.sinopsis,
      pubYear: bookApi.pubYear,
    }
  }
}
