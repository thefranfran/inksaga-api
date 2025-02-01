import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/database/entities/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.find({
      relations: [],
      select: ['id', 'title', 'alternative_title', 'cover_image'],
    });
  }

  async findById(id: number): Promise<Books | null> {
    return this.booksRepository
      .createQueryBuilder('book')
      .select([
        'book.title',
        'book.alternative_title',
        'book.slug',
        'book.id',
        'book.total_chapters',
      ])
      .leftJoin('book.chapters', 'chapter')
      .addSelect(['chapter.id', 'chapter.title'])
      .where('book.id = :id', { id })
      .orderBy('LENGTH(book.slug)', 'ASC')
      .getOne();
  }
}
