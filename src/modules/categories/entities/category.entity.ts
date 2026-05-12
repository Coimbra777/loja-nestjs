import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => User, (user) => user.category)
  users!: User[];
}
