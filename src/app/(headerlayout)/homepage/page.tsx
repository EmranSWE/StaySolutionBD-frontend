import React, { Suspense } from "react";
import FeaturedPropertyPage from "./Featured Property/page";
import RecentPropertyPage from "./RecentProperty/page";
import PopularPageCategory from "./PopularCategory/page";
import MarketPlaceProperty from "./MarketplacePage/page";
import WhyUsePage from "./WhyUs/page";
import OurMissionPage from "./Our Mission/page";
import FAQ from "./FAQ/page";
import FeedbackPage from "./Feedback/page";

const LazyBannerPage = React.lazy(() => import("./BannerPage/page"));

const LoadingComponent = () => {
  return <div>Loading...</div>;
};

const HomePage = () => {
  return (
    <div style={{ width: "100%" }}>
      <Suspense fallback={<LoadingComponent />}>
        <LazyBannerPage />
      </Suspense>
      <FeaturedPropertyPage></FeaturedPropertyPage>
      <OurMissionPage></OurMissionPage>
      <RecentPropertyPage></RecentPropertyPage>
      <PopularPageCategory></PopularPageCategory>
      <MarketPlaceProperty></MarketPlaceProperty>
      <FeedbackPage></FeedbackPage>
      <FAQ></FAQ>
      <WhyUsePage></WhyUsePage>
    </div>
  );
};

export default HomePage;
