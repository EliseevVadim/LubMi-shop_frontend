import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import MainLayout from "@/layouts/MainLayout";

const NotFoundContent = () => {


  return (
    <MaxWithLayout>
      <MainLayout>
        <div
          style={{
            minHeight: 500,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Страница не найдена
        </div>
      </MainLayout>
    </MaxWithLayout>
  );
};

export default NotFoundContent;
