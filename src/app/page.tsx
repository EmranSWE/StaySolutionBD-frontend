import React from "react";
import HeaderLayoutPage from "./(headerlayout)/layout";
import HomePage from "./(headerlayout)/homepage/page";
import RentalFooter from "./(headerlayout)/homepage/Footer/page";

const MainPage = () => {
  return (
    <div>
      <HeaderLayoutPage>
        <HomePage></HomePage>
      </HeaderLayoutPage>
    </div>
  );
};

export default MainPage;
