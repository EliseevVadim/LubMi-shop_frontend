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
import {$productModal, setProductModal} from "@/entety/modals/model";
import {useUnit} from "effector-react";
import {$favorites} from "@/entety/client/favorite/model";
import {$bucket, changeActiveOrder} from "@/entety/client/bucket/model";


const MainLayout: FC<PropsWithChildren<any>> = ({
                                                  children,
                                                }) => {
  const router = useRouter();
  const [productModal] = useUnit([$productModal])

  useEffect(() => {
    if (router.query.product) {
      setProductModal({...productModal, article: router.query.product});
    }
    if (router.query?.Success === 'true' && router.query?.PaymentId){
      console.log('Success')
      console.log(router.query)
      changeActiveOrder(router.query?.PaymentId)
      router.replace(router.pathname, undefined, { shallow: true });

    } else if(router.query?.Success === 'false' && router.query?.PaymentId) {
      console.log('Error')
      console.log(router.query)
      changeActiveOrder(router.query?.PaymentId)
      router.replace(router.pathname, undefined, { shallow: true });

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
