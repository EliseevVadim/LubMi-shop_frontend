import React from 'react';
import CatalogContent from "../../features/catalog/CatalogContent";
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";

const CatalogPage = () => {

  return (
    <Meta title={'Каталог'}>
      <MainLayout>
        <CatalogContent />
      </MainLayout>
    </Meta>
  );
};

export default CatalogPage;
