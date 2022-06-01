import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms'
import { BooksFactoryService } from '../../services/books-factory.service'

@Component({
  selector: 'app-book-form-edit',
  templateUrl: './book-form-edit.component.html',
  styleUrls: ['./book-form-edit.component.css']
})
export class BookFormEditComponent {

  bookEditForm = this.formBuilder.group({
    ...this.data
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
      pubYear: string
    },
    private formBuilder: FormBuilder,
    private booksFactoryService: BooksFactoryService,

  ) { }

  onEdit() {
    const {title, pages, editorial, isbn, price, sinopsis, pubYear} = this.bookEditForm.value

    this.booksFactoryService
      .updateBook(this.data.id, {
        title,
        pages,
        editorial,
        isbn,
        price,
        sinopsis,
        pubYear
      })
      .subscribe(() => {
        this.dialogRef.close()
      })
  }

}
