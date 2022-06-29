import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book, BookApi, BookRequest } from '../model/books/books'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksFactoryService {
  BASE_URL = `${environment.baseUrl}/books`

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
      price: bookApi.price,
      sinopsis: bookApi.sinopsis,
      pubYear: bookApi.pubYear,
      authors: bookApi.authors,
      categories: bookApi.categories
    }
  }

  createBook(request: BookRequest): Observable<BookApi>{
    return this.http.post<BookApi>(this.BASE_URL, request)
  }

  updateBook(
    bookId: string,
    bookRequest: BookRequest
  ): Observable<BookApi> {
    const url = `${this.BASE_URL}/${bookId}`
    return this.http.put<BookApi>(url, bookRequest)
  }

  deleteBook(bookId: string) {
    const url = `${this.BASE_URL}/${bookId}`
    return this.http.delete<string>(url, {
      responseType: 'text' as 'json'
    })
  }
}
