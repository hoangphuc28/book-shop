"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import CardItem from "./cardItem";

export default function Carousel() {
  return (
    <div className="container pb-16 mt-10">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-5">
        top new arrival
      </h2>
        <Swiper
        slidesPerView={4}
        spaceBetween={50}
        // pagination={{
        //   clickable: true,
        // }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
         className="mySwiper">
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        <SwiperSlide><CardItem/></SwiperSlide>
        </Swiper>
    </div>
  );
}
