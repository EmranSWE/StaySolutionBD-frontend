"use client";
import React from "react";
import HeaderPage from "../HeaderPage/page";
import BannerPage from "./BannerPage/page";
import FeaturedPropertyPage from "./Featured Property/page";
import RentalFooter from "./Footer/page";
import Feedback from "../feedback/page";

const HomePage = () => {
  return (
    <div>
      <BannerPage></BannerPage>
      <FeaturedPropertyPage></FeaturedPropertyPage>
      <Feedback></Feedback>
      <RentalFooter></RentalFooter>
    </div>
  );
};

export default HomePage;
