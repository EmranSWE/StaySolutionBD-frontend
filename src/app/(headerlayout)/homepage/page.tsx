import React from "react";
import BannerPage from "./BannerPage/page";
import FeaturedPropertyPage from "./Featured Property/page";
import RecentPropertyPage from "./RecentProperty/page";
import PopularPageCategory from "./PopularCategory/page";
import MarketPlaceProperty from "./MarketplacePage/page";
import WhyUsePage from "./WhyUs/page";
import OurMissionPage from "./Our Mission/page";
import FAQ from "./FAQ/page";
import FeedbackPage from "./Feedback/page";

const HomePage = () => {
  return (
    <div>
      <BannerPage></BannerPage>
      <FeaturedPropertyPage></FeaturedPropertyPage>
      <RecentPropertyPage></RecentPropertyPage>
      <PopularPageCategory></PopularPageCategory>
      <MarketPlaceProperty></MarketPlaceProperty>
      <FeedbackPage></FeedbackPage>
      <OurMissionPage></OurMissionPage>
      <WhyUsePage></WhyUsePage>
      <FAQ></FAQ>
    </div>
  );
};

export default HomePage;
