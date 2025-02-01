import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;
}
