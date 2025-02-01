import slugify from 'slugify';
import { BookStatus } from 'src/books/books.interfaces';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Chapters } from './chapters.entity';

@Entity()
export class Books extends BaseEntity {
  @OneToMany(() => Chapters, (chapter) => chapter.book, {
    eager: true,
  })
  chapters: Chapters[];

  @Column({
    type: 'text',
    unique: true,
  })
  title: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  @Column()
  alternative_title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({
    type: 'jsonb',
    default: ['others'],
  })
  categories: string[];

  @Column()
  total_chapters: number;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.ONGOING,
  })
  status: BookStatus;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 3,
  })
  average_rating: number;

  @Column({
    default: 0,
  })
  ratings_count: number;

  @Column({
    default: 0,
  })
  reviews_count: number;

  @Column()
  cover_image: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
}
