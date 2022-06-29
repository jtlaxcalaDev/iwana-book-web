import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder } from '@angular/forms'
import { BooksFactoryService } from '../../services/books-factory.service'
<<<<<<< HEAD
import { BookAuthorRequest, BookAuthorResource, BookCategoryRequest, BookCategoryResource} from '../../model/books/books';
=======
import { BookAuthorRequest, BookAuthorResource } from 'src/app/model/books/books';
>>>>>>> origin/develop

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
<<<<<<< HEAD
    categories: this.formBuilder.array(
      this.data.categories.map(({ name, id }) => {
        return this.formBuilder.group({
          name,
          id
        })
      })
    )
=======
    categories: []
>>>>>>> origin/develop
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
<<<<<<< HEAD
      authors: BookAuthorResource[],
      categories: BookCategoryResource[]
=======
      authors: BookAuthorResource[]
>>>>>>> origin/develop
    },
    private formBuilder: FormBuilder,
    private booksFactoryService: BooksFactoryService,

  ) { }

  getAuthorsFormArray(): FormArray {
    return this.bookEditForm.get('authors') as FormArray
  }

<<<<<<< HEAD
  getCategoriesFormArray(): FormArray {
    return this.bookEditForm.get('categories') as FormArray
  }

=======
>>>>>>> origin/develop
  getAuthors(): BookAuthorRequest[] {
    return this.getAuthorsFormArray().controls.map(
      ({ value: { name, lastName, id } }) => ({
        name,
        lastName,
        id
      })
    )
  }

<<<<<<< HEAD
  getCategories(): BookCategoryRequest[] {
    return this.getCategoriesFormArray().controls.map(({ value: { name } }) => ({
      name
    }))
  }

=======
>>>>>>> origin/develop
  deleteAuthor(indexToDelete: number) {
    this.getAuthorsFormArray().removeAt(indexToDelete)
  }

<<<<<<< HEAD
  deleteCategory(indexToDelete: number) {
    this.getCategoriesFormArray().removeAt(indexToDelete)
  }

=======
>>>>>>> origin/develop
  addAuthor() {
    this.getAuthorsFormArray().push(
      this.formBuilder.group({
        id: undefined,
        name: '',
        lastName: ''
      })
    )
  }

<<<<<<< HEAD
  addCategory() {
    this.getCategoriesFormArray().push(
      this.formBuilder.group({
        id: undefined,
        name: '',
      })
    )
  }

=======
>>>>>>> origin/develop
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
<<<<<<< HEAD
        categories: this.getCategories().filter(
          ({ name }) => !this.isCategoryEmpty( name )
        )
=======
        categories: []
>>>>>>> origin/develop
      })
      .subscribe(() => {
        this.dialogRef.close()
      })
  }

  isAuthorEmpty(name: String, lastName: string) {
    return name.trim() === '' && lastName.trim() === ''
  }

<<<<<<< HEAD
  isCategoryEmpty(name: String) {
    return name.trim() === ''
  }

=======
>>>>>>> origin/develop
}
