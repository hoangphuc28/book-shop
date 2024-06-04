import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { PromotionLevel } from '../constants';



@Entity()
export class Promotion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  isActive: boolean;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: PromotionLevel,
    default: PromotionLevel.Level_Order,
  })
  level: PromotionLevel;

  @Column('json')
  validationRule: OrderLevelValidationRule | ProductLevelValidationRule;

  @BeforeInsert()
  @BeforeUpdate()
  validateRules() {
    if (this.level === PromotionLevel.Level_Order) {
      if (!this.isOrderLevelValidationRule(this.validationRule)) {
        throw new Error('Invalid validation rule for order level promotion');
      }
    } else if (this.level === PromotionLevel.Level_Product) {
      if (!this.isProductLevelValidationRule(this.validationRule)) {
        throw new Error('Invalid validation rule for product level promotion');
      }
    }
  }

  private isOrderLevelValidationRule(rule: any): rule is OrderLevelValidationRule {
    return rule && typeof rule.limit === 'number';
  }

  private isProductLevelValidationRule(rule: any): rule is ProductLevelValidationRule {
    return rule && Array.isArray(rule.productId) && rule.productId.every((id: string) => typeof id === 'string');
  }
}

export interface OrderLevelValidationRule {
  limit: number;
}

export interface ProductLevelValidationRule {
  productId: string[];
}
