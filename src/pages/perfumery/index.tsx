import React from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import PerfumeryContent from "../../features/perfumery/PerfumeryContent";

const PerfumeryPage = () => {

  return (
    <Meta title={'Парфумерия'}>
      <MainLayout>
        <PerfumeryContent />
      </MainLayout>
    </Meta>
  );
};

export default PerfumeryPage;
