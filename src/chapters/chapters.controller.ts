import { Controller, Get, Param } from '@nestjs/common';
import { Chapters } from 'src/database/entities/chapters.entity';
import { ChaptersService } from './chapters.service';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get('/:bookId/:chapterNumber')
  async findChapter(
    @Param('bookId') bookId: number,
    @Param('chapterNumber') chapterNumber: number,
  ): Promise<Chapters | null> {
    return this.chaptersService.findChapter(bookId, chapterNumber);
  }
}
