import React, { FC, PropsWithChildren, useEffect } from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


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
      <Header/>
      <div className="main-block">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
