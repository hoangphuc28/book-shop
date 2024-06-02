import { Fragment } from "react";
import CardItem from "../../components/cardItem";
import { Book } from "../../utils/interfaces/book";
interface Props {
  products: Book[]
}
export default async function Products({products}: Props) {
  return(
    <div className="grid grid-cols-5 md:grid-cols-2 gap-5">
    {products?.map((item: Book, index: number) => {
      return (
        <Fragment key={index}>
          <CardItem product={item} />
        </Fragment>
      );
    })}
  </div>
  )
}
