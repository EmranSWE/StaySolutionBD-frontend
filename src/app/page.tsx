import React from "react";
import HeaderLayoutPage from "./(headerlayout)/layout";
import HomePage from "./(headerlayout)/homepage/page";

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
