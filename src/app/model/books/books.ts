export interface Book {
  id: string
  title: string
  pages: string,
  editorial: string,
  isbn: string,
  price:  number,
  sinopsis: string,
  pubYear: string,
  authors: BookAuthorResource[]
  categories: BookCategoryResource[]
}

export interface BookApi {
  id: string
  title: string
  pages: string,
  editorial: string,
  isbn: string,
  price: number,
  sinopsis: string,
  pubYear: string,
  authors: BookAuthorResource[]
  categories: BookCategoryResource[]
}

export interface BookAuthorResource {
  id: string
  name: string
  lastName: string
}

export interface BookCategoryResource {
  id: string
  name: string
}

export interface BookAuthorRequest {
  id?: string
  name: string
  lastName: string
}

export interface BookCategoryRequest {
  id?: string
  name: string
}

export interface BookRequest {
  title: string
  pages: string,
  editorial: string,
  isbn: string,
  price: number,
  sinopsis: string,
  pubYear: string,
  authors: BookAuthorRequest[]
  categories: BookCategoryRequest[]
}
