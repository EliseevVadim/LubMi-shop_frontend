import React, { FC, PropsWithChildren, useEffect } from 'react';
import Header from "../components/Header/Header";


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
      justifyContent: "space-between"
    }}>
      <Header/>
      <div className="main-block">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
