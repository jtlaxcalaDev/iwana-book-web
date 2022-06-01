import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms'
import { BooksFactoryService } from '../../services/books-factory.service'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  bookForm = this.formBuilder.group({
    title: '',
    pages: '',
    editorial: '',
    isbn: '',
    price: '',
    sinopsis: '',
    pubYear: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookFormComponent>,
    private booksFactoryService: BooksFactoryService
  ) { }

  createBook() {
    const {title,pages,editorial,isbn,price,sinopsis,pubYear} = this.bookForm.value;

    this.booksFactoryService.createBook(
      {
        title,
        pages,
        editorial,
        isbn,
        price,
        sinopsis,
        pubYear,
      }
    ).subscribe(()=>{this.dialogRef.close()})
  }
}
