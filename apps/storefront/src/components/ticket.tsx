import { CheckPromotionLevel } from "../utils/checkLevelPromotion";
import { formatVndTo1k } from "../utils/formatCurrency";
import { PromotionLevel } from "../utils/interfaces/enum"
import { Promotion } from "../utils/interfaces/promotion"
import { useOrder } from "../utils/providers/order";
import formatter from "../utils/timeFormat";


interface Props {
  promotion: Promotion
}
export default function Ticket({promotion}: Props) {
  const {applyPromotion} = useOrder()
  return (

        <article className="card fl-left">
          <div  className="date ">
            <p className="text-xl text-black absolute inset-0 flex justify-center items-center">{
              CheckPromotionLevel(promotion) === 1 ? promotion?.validationRule?.percentage + '%' :
              formatVndTo1k(promotion?.validationRule?.discountValuePerProduct) +'k'
            }</p>
          </div>
          <section className="card-cont">
            <p className="text-black text-base">{promotion?.code}</p>
            <div className="even-date text-xs">
                <span>{formatter.format(new Date(promotion?.startDate))}</span> {' - '}
                <span>{formatter.format(new Date(promotion?.endDate))}</span>
            </div>
            <button onClick={() => applyPromotion(promotion)} className="text-base rounded-sm">Apply</button>
          </section>
        </article>
  )
}
