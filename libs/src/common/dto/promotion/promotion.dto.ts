import { PromotionLevel } from "../../constants";
import { OrderLevelValidationRule, ProductLevelValidationRule } from "../../entities";

export class CreatePromotionDto {
  code: string;
  startDate: Date;
  endDate: Date;
  level: PromotionLevel;
  isActive: boolean;
  percentage: number;
  discountValue: number;
  validationRule: OrderLevelValidationRule | ProductLevelValidationRule;
}

export class UpdatePromotionDto {
  id: string;
  code: string;
  startDate: Date;
  endDate: Date;
  level: PromotionLevel;
  isActive: boolean;
  percentage: number;
  discountValue: number;
  validationRule: OrderLevelValidationRule | ProductLevelValidationRule;
}

export class ApplyPromotionDto {
  promotionId: string;
}
