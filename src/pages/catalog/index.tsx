import React, { FC, PropsWithChildren } from 'react';
import CatalogContent from "../../features/catalog/CatalogContent";
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import { api } from "../../api/ApiWithoutToken";

const CatalogPage: FC<PropsWithChildren<any>> = ({
                                                   products
                                                 }) => {

  return (
    <Meta title={'Каталог'}>
      <MainLayout>
        <CatalogContent
          products={products?.data}
          totalCount={products['total-count']}
        />
      </MainLayout>
    </Meta>
  );
};

export async function getServerSideProps(context: any){

  const sort: any = {
    page: context?.query?.page || 1,
    limit: context?.query?.limit || 10,
    sort: context?.query?.sort || 'novelties-first',
  }

  try {
    const data: any = await api.get(`/products/${sort.sort}/${sort.limit}/${sort.page}`);
    return {
      props: {
        products: data.data || {},
      },
    }
  } catch (e: any) {
    console.log(e)
    console.log('e?.response')
    return {
      props: {
        products: {},
      },
    }
  }
}

export default CatalogPage;
