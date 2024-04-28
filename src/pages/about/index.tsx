import React from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import AboutContent from "../../features/about/AboutContent";

const AboutPage = () => {
  return (
    <Meta title={'О компании'}>
      <MainLayout>
        <AboutContent />
      </MainLayout>
    </Meta>
  );
};

export default AboutPage;
