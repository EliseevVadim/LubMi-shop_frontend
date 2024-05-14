import React, { FC, PropsWithChildren } from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import LineBlock from "../../components/client/common/LineBlock";
import AboutMain from "./components/AboutMain";
import AboutWe from "./components/AboutWe";
import AboutPartner from "./components/AboutPartner";

const AboutContent: FC<PropsWithChildren<any>> =({
                        data
                      }) => {



  const aboutWeItems = data?.items?.filter((item: any) => item?.kind === 0)
  const aboutPartnerItems = data?.items?.filter((item: any) => item?.kind === 1)


  return (
    <MaxWithLayout>
      <div className="about">
        <LineBlock />
        <h1>
          о бренде
        </h1>

        <AboutMain/>

        <LineBlock />

        <AboutWe data={aboutWeItems}/>

        <LineBlock />

        <AboutPartner data={aboutPartnerItems}/>

      </div>
    </MaxWithLayout>
  );
};

export default AboutContent;
