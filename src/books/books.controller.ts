import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Books } from 'src/database/entities/books.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Books[]> {
    return this.booksService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Books | null> {
    const book = await this.booksService.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}
