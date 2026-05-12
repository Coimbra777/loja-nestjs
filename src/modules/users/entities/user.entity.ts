import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Category } from '../../categories/entities/category.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Category, (category) => category.users)
  category!: Category;
}
