import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapters } from 'src/database/entities/chapters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapters)
    private chaptersRepository: Repository<Chapters>,
  ) {}

  async findChapter(
    bookId: number,
    chapterNumber: number,
  ): Promise<Chapters | null> {
    console.log(bookId, chapterNumber);
    return this.chaptersRepository.findOne({
      where: {
        chapter_number: chapterNumber,
        book_id: bookId,
      },
      select: ['title', 'content', 'last_update'],
    });
  }
}
