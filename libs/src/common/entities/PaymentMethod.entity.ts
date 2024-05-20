import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './Payment.entity';
import { Order } from './Order.entity'; // Import Order entity

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Payment, (payment) => payment.paymentMethod)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.paymentMethod) // Define the relationship with Order
  orders: Order[]; // Define the orders property
}
