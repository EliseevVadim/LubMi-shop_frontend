import React from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import CareContent from "../../features/care/CareContent";

const CarePage = () => {

  return (
    <Meta title={'Уход и состав'}>
      <MainLayout>
        <CareContent />
      </MainLayout>
    </Meta>
  );
};

export default CarePage;
