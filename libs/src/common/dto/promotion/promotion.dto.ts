import { PromotionLevel } from "../../constants";
import { OrderLevelValidationRule, ProductLevelValidationRule } from "../../entities";

export class CreatePromotionDto {
  code: string;
  startDate: Date;
  endDate: Date;
  level: PromotionLevel;
  validationRule: OrderLevelValidationRule | ProductLevelValidationRule;
}

export class UpdatePromotionDto {
  code?: string;
  startDate?: Date;
  endDate?: Date;
  level?: PromotionLevel;
  validationRule?: OrderLevelValidationRule | ProductLevelValidationRule;
}

export class ApplyPromotionDto {
  promotionId: string;
}
