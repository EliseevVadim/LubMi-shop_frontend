import React, { FC, PropsWithChildren } from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import SortBloc from "./SortBloc";
import Card from "./Card";
import CustomButton from "../common/CustomButton";
import { useRouter } from "next/router";

const Catalog: FC<PropsWithChildren<{
  title?: string,
  totalCount?: number,
  replaceUrl?: boolean,
  isWithSort?: boolean,
  products?: any[]
  setSort?: any
}>> = ({
         title = 'Каталог',
         products,
         replaceUrl = false,
         isWithSort = true,
         totalCount = 0,
         setSort = () => {
         }
       }) => {

  const router = useRouter();

  const changePage = () => {
    if (replaceUrl) {
      const { pathname, query } = router;
      const newQuery = { ...query, limit: query?.limit ? Number(query?.limit) + 10 : 20 };
      const href = {
        pathname,
        query: newQuery,
      };
      router.push(href);
    } else {
      setSort()
    }
  }

  return (
    <MaxWithLayout>
      <div className='catalog'>
        <div className="catalog-line">
          <div className="catalog-line-extra" />
        </div>
        <div className="catalog-top">
          <h2>
            {title}
          </h2>
          {
            isWithSort &&
            <SortBloc replaceUrl={replaceUrl} setCurrentSort={setSort} />
          }
        </div>
        <div className="catalog-items">
          {
            products?.map((item: any) =>
              <Card item={item} key={item?.article} />
            )
          }
        </div>
        {products?.length >= totalCount
          ?
          null
          :
          <div className="catalog-show-more">
            <CustomButton
              onClick={changePage}
              title={'Загрузить еще'}
              padding={'24px 0'}
              maxWidth={300}
              border={'2px solid rgba(34, 34, 34, 1)'}
            />
          </div>
        }
      </div>
    </MaxWithLayout>
  );
};

export default Catalog;
