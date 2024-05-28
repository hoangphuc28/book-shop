'use client'
import { Fragment } from "react";
import Banner from "../components/banner";
import Carousel from "../components/carousel";
import Featured from "../components/featured";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/api/graphQL/apolloClient";
export default function Index() {

  return (
   <Fragment>
    <Banner/>
    <Carousel/>
    <Featured/>
   </Fragment>
  );
}
