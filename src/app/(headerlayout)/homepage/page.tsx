import React from "react";
import BannerPage from "./BannerPage/page";
import FeaturedPropertyPage from "./Featured Property/page";
import RentalFooter from "./Footer/page";
import RecentPropertyPage from "./RecentProperty/page";
import PopularPageCategory from "./PopularCategory/page";
import MarketPlaceProperty from "./MarketplacePage/page";

const HomePage = () => {
  return (
    <div>
      <BannerPage></BannerPage>
      <FeaturedPropertyPage></FeaturedPropertyPage>
      <RecentPropertyPage></RecentPropertyPage>
      <PopularPageCategory></PopularPageCategory>
      <MarketPlaceProperty></MarketPlaceProperty>
      <RentalFooter></RentalFooter>
    </div>
  );
};

export default HomePage;
