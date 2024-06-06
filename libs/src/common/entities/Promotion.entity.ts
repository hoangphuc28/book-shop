import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Unique,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { PromotionLevel } from '../constants';
import { ObjectType, Field, registerEnumType, createUnionType } from '@nestjs/graphql';
import { Order } from './Order.entity';

registerEnumType(PromotionLevel, {
  name: 'PromotionLevel',
  description: 'The levels at which a promotion can be applied',
});

@ObjectType()
@Unique(["code"])
@Entity()
export class Promotion extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  code: string;

  @Column()
  isActive: boolean;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.promotion)
  orders: Order[];

  // @Column({nullable: true, default: 0})
  // percentage: number

  // @Column({nullable: true, default: 0})
  // discountValue: number
  @Field(() => PromotionLevel)
  @Column({
    type: 'enum',
    enum: PromotionLevel,
    default: PromotionLevel.Level_Order,
  })
  level: PromotionLevel;

  @Field(() => ValidationRuleUnion)
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
    return rule && Array.isArray(rule.productIdList) && rule.productIdList.every((id: string) => typeof id === 'string');
  }
}

// export interface OrderLevelValidationRule {
//   limit: number;
//   percentage: number;
// }

// export interface ProductLevelValidationRule {
//   productIdList: string[];
//   discountValuePerProduct: number
// }


@ObjectType()
export class OrderLevelValidationRule {
  @Field()
  limit: number;

  @Field()
  percentage: number;
}

// Define the ProductLevelValidationRule GraphQL type
@ObjectType()
export class ProductLevelValidationRule {
  @Field(() => [String])
  productIdList: string[];

  @Field()
  discountValuePerProduct: number;
}

const ValidationRuleUnion = createUnionType({
  name: 'ValidationRule', // the name of the GraphQL union
  types: () => [OrderLevelValidationRule, ProductLevelValidationRule] as const,
  resolveType: value => {
    if ('limit' in value && 'percentage' in value) {
      return OrderLevelValidationRule;
    }
    if ('productIdList' in value && 'discountValuePerProduct' in value) {
      return ProductLevelValidationRule;
    }
    return null;
  },
});
