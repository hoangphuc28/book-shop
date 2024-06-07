import { Fragment } from "react";
import { loadBooksWithCondition } from "../app/fetchData";
import { Book } from "../utils/interfaces/book";
import CardItem from "./cardItem";
interface Props {
  condition: number
}
export default async function LoadDataFeature({condition}: Props) {
  const {booksData} = await loadBooksWithCondition(condition, 8)

  return (
    <Fragment>
      {booksData?.map((item: Book, index: number) => {
        return(
          <Fragment key={index}>
          <CardItem product={item}/>

          </Fragment>
        )
      })}

    </Fragment>
  )
}
