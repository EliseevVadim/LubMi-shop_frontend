import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import LineBlock from "../../components/client/common/LineBlock";
import AboutMain from "./components/AboutMain";
import AboutWe from "./components/AboutWe";
import AboutPartner from "./components/AboutPartner";

const AboutContent = () => {

  return (
    <MaxWithLayout>
      <div className="about">
        <LineBlock />
        <h1>
          о бренде
        </h1>

        <AboutMain/>

        <LineBlock />

        <AboutWe/>

        <LineBlock />

        <AboutPartner/>

      </div>
    </MaxWithLayout>
  );
};

export default AboutContent;
