import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JsonContains,
} from 'typeorm';

import { AboutPage } from './About.entity';

@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('jsonb', { nullable: true })
  paymentInfor: Record<string, any>

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Admin>) {
    super()
    Object.assign(this, partial)
  }
}
