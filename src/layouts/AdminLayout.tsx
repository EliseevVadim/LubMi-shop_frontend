import React, { FC, useEffect } from 'react';
import { useUnit } from "effector-react";
import SideBarNav from "../shared/SideBarNav/index";
import { $user } from "../entety/admin/user/model/index";
import Header from "../shared/Header/index";
import { useRouter } from "next/router";

const AdminLayout: FC = ({
                           children
                         }) => {


  const [user] = useUnit([$user])
  const router = useRouter()

  const isUserExist = user?.username

  useEffect(() => {
    if (!isUserExist) {
      router.push('/admin')
    } else {
      router.push('/admin/category')
    }
  }, [user])

  return (
    <div
      style={{
        display: "flex",
        height: '100%',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {
        isUserExist &&
        <Header />
      }
      {
        isUserExist &&
        <SideBarNav />
      }
      {
        children
      }
    </div>
  );
};

export default AdminLayout;
