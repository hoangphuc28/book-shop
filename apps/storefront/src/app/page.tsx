import { Fragment } from "react";
import Banner from "../components/banner";
import Carousel from "../components/carousel";
import Featured from "../components/featured";
export default function Index() {
  return (
   <Fragment>
    <Banner/>
    <Carousel/>
    <Featured/>
   </Fragment>
  );
}
