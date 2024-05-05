import React, { FC, PropsWithChildren } from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import SortBloc from "./SortBloc";
import Card from "./Card";
import CustomButton from "../common/CustomButton";

const Catalog: FC<PropsWithChildren<{
  title?: string,
  totalCount?: number,
  replaceUrl?: boolean,
  products?: any[]
}>> = ({
         title = 'Каталог',
         products,
         replaceUrl = false,
         totalCount = 0
       }) => {

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
          <SortBloc replaceUrl={replaceUrl} />
        </div>
        <div className="catalog-items">
          {
            products?.map((item: any) =>
              <Card item={item} key={item?.article}/>
            )
          }
        </div>
        {totalCount > 11 &&
        <div className="catalog-show-more">
            <CustomButton
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
