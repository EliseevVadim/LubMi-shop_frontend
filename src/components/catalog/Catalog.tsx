import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import SortBloc from "./SortBloc";
import Card from "./Card";
import CustomButton from "../common/CustomButton";

const Catalog = () => {

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <MaxWithLayout>
      <div className='catalog'>
        <div className="catalog-line">
          <div className="catalog-line-extra" />
        </div>
        <div className="catalog-top">
          <h2>
            Бестселлеры
          </h2>
          <SortBloc />
        </div>
        <div className="catalog-items">
          {
            items?.map((item: any) =>
              <Card />
            )
          }
        </div>
        <div className="catalog-show-more">
          <CustomButton
            title={'Загрузить еще'}
            padding={'24px 0'}
            maxWidth={300}
            border={'2px solid rgba(34, 34, 34, 1)'}
          />
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default Catalog;
