import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';
import { Books } from 'src/database/entities/books.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([Books])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
