import { PromotionLevel } from "./interfaces/enum";
import { Promotion } from "./interfaces/promotion";

export const CheckPromotionLevel = (promotion: Promotion | null) => {
  const level = PromotionLevel[promotion?.level.toString() as keyof typeof PromotionLevel];
  if(level === PromotionLevel?.Level_Order) {
    return 1
  }
  return 2
}
