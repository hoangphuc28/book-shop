import { Fragment } from "react";

import { loadBookOnSale } from '../app/fetchData';
import { Book } from '../utils/interfaces/book';
import CardItem from "../components/cardItem";
import Carousel from "../components/carousel";

export default async function ProductsOnSale() {
  const { booksData } = await loadBookOnSale();

  return (
    <div className="container pb-16 mt-10">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-5">
        Top New Arrival
      </h2>
      <Carousel booksData={booksData} />
        {/* {booksData?.map((item: Book, index: number) => (
          <Fragment key={index}>
              <CardItem product={item} />
          </Fragment>
        ))} */}
    </div>
  );
}
