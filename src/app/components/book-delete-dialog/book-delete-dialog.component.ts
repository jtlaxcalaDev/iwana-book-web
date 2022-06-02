import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BooksFactoryService } from 'src/app/services/books-factory.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private booksFactoryService: BooksFactoryService,
    private snackBar: MatSnackBar,
  ) { }

  onDelete() {
    this.booksFactoryService
      .deleteBook(this.data.id)
      .subscribe(() => {
        this.snackBar.open(
          `the book ${this.data.title} has been deleted`,
          '',
          {
            duration: 2500,
            panelClass: ['deleted-snackbar']
          }
        )
        this.dialogRef.close()
      })
  }

}
