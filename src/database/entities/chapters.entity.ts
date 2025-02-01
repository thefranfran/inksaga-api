import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Books } from './books.entity';

@Entity()
export class Chapters extends BaseEntity {
  @ManyToOne(() => Books, (book) => book.chapters)
  @JoinColumn({ name: 'book_id' })
  book: Books;

  @Column()
  @IsNotEmpty()
  @IsInt()
  book_id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  chapter_number: number;

  @Column({
    default: false,
  })
  @IsBoolean()
  is_updated: boolean;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDate()
  last_update: Date;
}
