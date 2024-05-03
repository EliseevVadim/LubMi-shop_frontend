import React, { useEffect } from 'react';
import Meta from "../../../seo/Meta";
import { useRouter } from "next/router";
import CategoryContent from "../../../features/category/CategoryContent/index";
import AdminLayout from "../../../layouts/AdminLayout";

const CategoryPage = () => {

  const router = useRouter()

  return (
    <Meta title={'Авторизация'}>
      <AdminLayout>
        <CategoryContent />
      </AdminLayout>
    </Meta>
  );
};

export default CategoryPage;
