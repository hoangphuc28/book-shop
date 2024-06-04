import { Fragment, Suspense } from "react";
import CardItem from "../../components/cardItem";
import { Book } from "../../utils/interfaces/book";

import { loadBooks } from "./fetchData";
import Pagination from "./pagination";
interface Props {
  page: string,
  limit: string,
  category: string[]
  author: string[]
  query: string
  rating: string
  sort: string
}
export default async function Products({page, limit, category, author, query, rating, sort}: Props) {
  const { booksData } = await loadBooks(
    parseInt(page || '1'),
    parseInt(limit || '8'),
    category || [],
    author || [],
    query || '',
    rating || '',
    sort || '0'
  );
  return (
    <div>
       <Pagination
              totalPage={booksData?.totalPage}
              totalItem={booksData?.totalItem}
              currentPage={booksData?.currentPage}
              itemsPerPage={booksData?.itemsPerPage}
            />
      <div className="grid grid-cols-4 md:grid-cols-2 gap-5 mt-5">
        {booksData.items?.map((item: Book, index: number) => {
          return (
            <Fragment key={index}>
              <CardItem product={item} />
            </Fragment>
          );
        })}
    </div>

      </div>
  )
}
