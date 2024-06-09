import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import CardItem from "./cardItem";

import { Book } from "../utils/interfaces/book";
import { loadBookOnSale } from "../app/fetchData";

export default async function Carousel() {
  const {booksData} = await loadBookOnSale()
  return (
    <div className="container pb-16 mt-10">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-5">
        Products On Sale
      </h2>
        <Swiper
        slidesPerView={4}
        spaceBetween={40}
        // pagination={{
        //   clickable: true,
        // }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
         className="mySwiper">
      {booksData?.map((item: Book, index: number) => {
        return (
          <SwiperSlide key={index}><CardItem product={item}/></SwiperSlide>
        )
      })}
        </Swiper>
    </div>
  );
}
