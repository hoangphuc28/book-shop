import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod } from './PaymentMethod.entity';
import { Admin } from './Admin.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.payments)
  paymentMethod: PaymentMethod;

  @Column()
  paymentKey: string;

  @Column()
  paymentValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Admin, (admin) => admin.payment)
  admins: Admin[];
}
