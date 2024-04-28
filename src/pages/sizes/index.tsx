import React from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import SizesContent from "../../features/sizes/SizesContent";

const SizesPage = () => {

  return (
    <Meta title={'Таблица размеров'}>
      <MainLayout>
        <SizesContent />
      </MainLayout>
    </Meta>
  );
};

export default SizesPage;
