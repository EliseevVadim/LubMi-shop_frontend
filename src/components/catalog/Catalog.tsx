import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import SortBloc from "./SortBloc";
import Card from "./Card";

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

        </div>
      </div>
    </MaxWithLayout>
  );
};

export default Catalog;
