import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder } from '@angular/forms'
import { BooksFactoryService } from '../../services/books-factory.service'
import { BookAuthorRequest, BookAuthorResource, BookCategoryRequest, BookCategoryResource} from '../../model/books/books';

@Component({
  selector: 'app-book-form-edit',
  templateUrl: './book-form-edit.component.html',
  styleUrls: ['./book-form-edit.component.css']
})
export class BookFormEditComponent {
  bookId = this.data.id

  bookEditForm = this.formBuilder.group({
    title: this.data.title,
    pages: this.data.pages,
    editorial: this.data.editorial,
    isbn: this.data.isbn,
    price: this.data.price,
    sinopsis: this.data.sinopsis,
    pubYear: this.data.pubYear,
    authors: this.formBuilder.array(
      this.data.authors.map(({ name, lastName, id }) => {
        return this.formBuilder.group({
          name,
          lastName,
          id
        })
      })
    ),
    categories: this.formBuilder.array(
      this.data.categories.map(({ name, id }) => {
        return this.formBuilder.group({
          name,
          id
        })
      })
    )
  })

  constructor(
    public dialogRef: MatDialogRef<BookFormEditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string
      title: string
      pages: string,
      editorial: string,
      isbn: string,
      price:  number,
      sinopsis: string,
      pubYear: string,
      authors: BookAuthorResource[],
      categories: BookCategoryResource[]
    },
    private formBuilder: FormBuilder,
    private booksFactoryService: BooksFactoryService,

  ) { }

  getAuthorsFormArray(): FormArray {
    return this.bookEditForm.get('authors') as FormArray
  }

  getCategoriesFormArray(): FormArray {
    return this.bookEditForm.get('categories') as FormArray
  }

  getAuthors(): BookAuthorRequest[] {
    return this.getAuthorsFormArray().controls.map(
      ({ value: { name, lastName, id } }) => ({
        name,
        lastName,
        id
      })
    )
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

  onEdit() {

    const {title,pages,editorial,isbn,price,sinopsis,pubYear} = this.bookEditForm.value;

    this.booksFactoryService
      .updateBook(this.bookId , {
        title,
        pages,
        editorial,
        isbn,
        price,
        sinopsis,
        pubYear,
        authors: this.getAuthors().filter(
          ({ name, lastName }) => !this.isAuthorEmpty( name, lastName )
        ),
        categories: this.getCategories().filter(
          ({ name }) => !this.isCategoryEmpty( name )
        )
      })
      .subscribe(() => {
        this.dialogRef.close()
      })
  }

  isAuthorEmpty(name: String, lastName: string) {
    return name.trim() === '' && lastName.trim() === ''
  }

  isCategoryEmpty(name: String) {
    return name.trim() === ''
  }

}
