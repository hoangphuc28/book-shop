

// order.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsArray, IsEnum } from 'class-validator';
// order-intent.enum.ts
export enum OrderIntent {
  INITIAL = 'CAPTURE',
}

export class UnitAmount {
  @IsString()
  currency_code: string;

  @IsString()
  value: string;
}

export class Item {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  quantity: string;

  @ValidateNested()
  @Type(() => UnitAmount)
  unit_amount: UnitAmount;
}

export class Breakdown {
  @ValidateNested()
  @Type(() => UnitAmount)
  item_total: UnitAmount;
}

export class Amount {
  @IsString()
  currency_code: string;

  @IsString()
  value: string;

  @ValidateNested()
  @Type(() => Breakdown)
  breakdown: Breakdown;
}

export class PurchaseUnit {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];

  @ValidateNested()
  @Type(() => Amount)
  amount: Amount;
}

@InputType()
export class ApplicationContext {
  @Field({nullable: true})
  @IsString()
  return_url: string;

  @Field({nullable: true})
  @IsString()
  cancel_url: string;
}

export class OrderDto {
  @IsEnum(OrderIntent)
  intent: OrderIntent;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseUnit)
  purchase_units: PurchaseUnit[];

  @ValidateNested()
  @Type(() => ApplicationContext)
  application_context: ApplicationContext;
}
