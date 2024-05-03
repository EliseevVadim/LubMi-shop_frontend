import React from 'react';
import Meta from "../../seo/Meta";
import { useRouter } from "next/router";
import LoginContent from "../../features/login/LoginContent/index";
import AdminLayout from "../../layouts/AdminLayout";

const AdminLogin = () => {

  const router = useRouter()

  return (
    <Meta title={'Авторизация'}>
      <AdminLayout>
        <LoginContent />
      </AdminLayout>
    </Meta>
  );
};

export default AdminLogin;
