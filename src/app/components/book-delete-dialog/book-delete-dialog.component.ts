import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BooksFactoryService } from 'src/app/services/books-factory.service';

@Component({
  selector: 'app-book-delete-dialog',
  templateUrl: './book-delete-dialog.component.html',
  styleUrls: ['./book-delete-dialog.component.css']
})
export class BookDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BookDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string
      title: string
    },
    private booksFactoryService: BooksFactoryService
  ) { }

  onDelete() {
    this.booksFactoryService
      .deleteBook(this.data.id)
      .subscribe((result) => {
        this.dialogRef.close()
      })
  }

}
