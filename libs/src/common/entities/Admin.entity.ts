import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Payment } from './Payment.entity';
import { OneToMany } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

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

  @OneToMany(() => Payment, (payment) => payment.admins)
  payment: Payment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  constructor(partial: Partial<Admin>) {
    super()
    Object.assign(this, partial)
  }
}
