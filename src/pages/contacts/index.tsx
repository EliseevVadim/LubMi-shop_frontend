import React from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import ContactContent from "../../features/contact/ContactContent";

const ContactPage = () => {

  return (
    <Meta title={'Контакты'}>
      <MainLayout>
        <ContactContent/>
      </MainLayout>
    </Meta>
  );
};

export default ContactPage;
