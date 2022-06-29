import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder } from '@angular/forms'
import { BooksFactoryService } from '../../services/books-factory.service'
import { BookAuthorRequest, BookCategoryRequest } from '../../model/books/books';

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
    pubYear: '',
    authors: this.formBuilder.array([]),
    categories: this.formBuilder.array([])
  })

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookFormComponent>,
    private booksFactoryService: BooksFactoryService
  ) { }

  getAuthorsFormArray(): FormArray {
    return this.bookForm.get('authors') as FormArray
  }

  getCategoriesFormArray(): FormArray {
    return this.bookForm.get('categories') as FormArray
  }

  getAuthors(): BookAuthorRequest[] {
    return this.getAuthorsFormArray().controls.map(({ value: { name, lastName } }) => ({
      name,
      lastName
    }))
  }

  getCategories(): BookCategoryRequest[] {
    return this.getCategoriesFormArray().controls.map(({ value: { name } }) => ({
      name
    }))
  }

  deleteAuthor(indexToDelete: number) {
    this.getAuthorsFormArray().removeAt(indexToDelete)
  }

  deleteCategory(indexToDelete: number) {
    this.getCategoriesFormArray().removeAt(indexToDelete)
  }

  addAuthor() {
    this.getAuthorsFormArray().push(
      this.formBuilder.group({
        id: undefined,
        name: '',
        lastName: ''
      })
    )
  }

  addCategory() {
    this.getCategoriesFormArray().push(
      this.formBuilder.group({
        id: undefined,
        name: '',
      })
    )
  }

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
        authors: this.getAuthors().filter(
          ({ name, lastName }) => !this.isAuthorEmpty(name, lastName)
        ),
        categories: this.getCategories().filter(
          ({ name }) => !this.isCategoryEmpty(name)
        )
      }
    ).subscribe(()=>{this.dialogRef.close()})
  }

  isAuthorEmpty(name: string, lastName: string) {
    return name.trim() === '' && lastName.trim() === ''
  }

  isCategoryEmpty(name: string) {
    return name.trim() === ''
  }
}
