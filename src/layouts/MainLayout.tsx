import React, { FC, PropsWithChildren, useEffect } from 'react';
import Header from "../components/client/Header/Header";
import Footer from "../components/client/Footer/Footer";
import MobMenu from "../entety/modals/UI/MobMenu";
import Favorite from "../entety/modals/UI/Favorite";
import Bucket from "../entety/modals/UI/Bucket";
import Search from "../entety/modals/UI/Search";
import NotificationModal from "../entety/modals/UI/NotificationModal";
import LeaveMessageModal from "../entety/modals/UI/LeaveMessageModal";
import ProductModal from "../entety/modals/UI/ProductModal";
import CheckoutModal from "../entety/modals/UI/CheckoutModal";
import {useRouter} from "next/router";
import {setProductModal} from "@/entety/modals/model";


const MainLayout: FC<PropsWithChildren<any>> = ({
                                                  children,
                                                }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.product) {
      setProductModal({article: router.query.product});
    }
  }, [router.query]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      justifyContent: "space-between",
      marginTop: 76,
    }}>
      <Header />
      <MobMenu />
      <Favorite />
      <Bucket />
      <Search />
      <NotificationModal />
      <LeaveMessageModal />
      <ProductModal />
      <CheckoutModal />
      <div className="main-block">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
