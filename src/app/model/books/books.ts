export interface Book {
  id: string
  title: string
  pages: string,
  editorial: string,
  isbn: string,
  price:  number,
  sinopsis: string,
  pubYear: string
}

export interface BookApi {
  id: string
  title: string
  pages: string,
  editorial: string,
  isbn: string,
  price: number,
  sinopsis: string,
  pubYear: string
}

export interface BookRequest {
  title: string
  pages: string,
  editorial: string,
  isbn: string,
  price: number,
  sinopsis: string,
  pubYear: string
}
