import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  create(createBookDto: CreateBookDto) {
    const currentMaxId = this.books[this.books.length - 1]?.id || 0;
    const id = currentMaxId + 1;
    const book = {
      id,
      ...createBookDto,
    };
    this.books.push(book);
    return book;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const index = this.books.findIndex((book) => book.id === id);
    return this.books[index];
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.findOne(id);

    const newBook = {
      ...book,
      ...updateBookDto,
    };
    const index = this.books.findIndex((book) => book.id === id);
    this.books[index] = newBook;

    return newBook;
  }

  remove(id: number) {
    const index = this.books.findIndex((book) => book.id === id);
    this.books.splice(index, 1);
    return `succes removed${index}`;
  }
}
