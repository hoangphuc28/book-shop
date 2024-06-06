import { PromotionLevel } from "./enum";

export interface ValidationRule {
  limit?: number;
  percentage?: number;
  productIdList?: string[];
  discountValuePerProduct?: number;
}
export interface Promotion {
  id: string;
  code: string;
  startDate: Date;
  endDate: Date;
  level: PromotionLevel;
  validationRule: ValidationRule;
}
