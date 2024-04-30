import React, { FC, PropsWithChildren, useEffect } from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobMenu from "../entety/modals/UI/MobMenu";
import Favorite from "../entety/modals/UI/Favorite";
import Bucket from "../entety/modals/UI/Bucket";
import Search from "../entety/modals/UI/Search";
import NotificationModal from "../entety/modals/UI/NotificationModal";
import { onSetNotification } from "../entety/modals/model/index";


const MainLayout: FC<PropsWithChildren<any>> = ({
                                                  children,
                                                }) => {

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
      <div
        style={{
          width: 40,
          height: 50,
          backgroundColor: '#000'
        }}
        onClick={() => onSetNotification({title: '1', message: '2'})}
      >

      </div>
      <div className="main-block">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
