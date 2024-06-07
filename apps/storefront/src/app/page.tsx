'use client'
import { Fragment, Suspense } from "react";
import Banner from "../components/banner";
import Carousel from "../components/carousel";
import Featured from "../components/featured";
import Loading from "../components/loading";

export default function Index() {

  return (
    <Fragment>
      <Banner />
      <Suspense fallback={<Loading/>}>
        <Carousel />
        </Suspense>
      <Featured />
    </Fragment>
  );
}
