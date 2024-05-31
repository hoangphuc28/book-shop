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
  name: string;

  @Column({unique: true})
  userName: string;

  @Column()
  password: string;

  @Column('jsonb', { nullable: true })
  paymentInfor: Record<string, any>

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  session: string;

  constructor(partial: Partial<Admin>) {
    super()
    Object.assign(this, partial)
  }
}
