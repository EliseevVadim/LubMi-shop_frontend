import React from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import DeliveryContent from "../../features/delivery/DeliveryContent";

const DeliveryPage = () => {

  return (
    <Meta title={'Доставка и оплата'}>
      <MainLayout>
        <DeliveryContent />
      </MainLayout>
    </Meta>
  );
};

export default DeliveryPage;
