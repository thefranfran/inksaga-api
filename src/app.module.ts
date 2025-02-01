import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { CacheModule } from './cache/cache.module';
import { ChaptersModule } from './chapters/chapters.module';
import { PostgresSQLService } from './postgresql.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule,
    BooksModule,
    ChaptersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: PostgresSQLService,
    }),
  ],
})
export class AppModule {}
