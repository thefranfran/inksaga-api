import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';
import { Chapters } from 'src/database/entities/chapters.entity';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';

@Module({
  imports: [CacheModule, TypeOrmModule.forFeature([Chapters])],
  providers: [ChaptersService],
  controllers: [ChaptersController],
})
export class ChaptersModule {}
