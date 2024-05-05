import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useUnit } from "effector-react";
import SideBarNav from "../components/admin/SideBarNav/index";
import { $user } from "../entety/admin/user/model/index";
import Header from "../components/admin/Header/index";
import { useRouter } from "next/router";

const AdminLayout: FC<PropsWithChildren<any>> = ({
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
