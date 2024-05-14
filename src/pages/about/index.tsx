import React, { FC, PropsWithChildren } from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import AboutContent from "../../features/about/AboutContent";
import { api } from "../../api/ApiWithoutToken";

const AboutPage: FC<PropsWithChildren<any>> = ({
                     data
                   }) => {
  return (
    <Meta title={'О компании'}>
      <MainLayout>
        <AboutContent data={data}/>
      </MainLayout>
    </Meta>
  );
};


export async function getStaticProps(context: any) {

  try {

    const data: any = await api.get("/service/about-items/");

    return {
      props: {
        data: data?.data || {},
      },
      revalidate: 60,
    }
  } catch (e: any) {
    console.log(e?.response?.data)
    return {
      props: {
        data: {},
      },
      revalidate: 60,
    }
  }
}

export default AboutPage;
