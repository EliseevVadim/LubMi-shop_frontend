import React, { FC, PropsWithChildren } from "react";
import Meta from "../seo/Meta";
import MainLayout from "../layouts/MainLayout";
import MainContent from "../features/main/MainContent";
import {onSetNotification} from "@/entety/modals/model";

const Home: FC<PropsWithChildren<any>> = ({
                                          }) => {

  return (
    <Meta title={'Главная'}>
      <MainLayout>
        <MainContent />
      </MainLayout>
    </Meta>
  )
}

export default Home;
