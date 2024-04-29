import React, { useEffect, useRef } from 'react';
import { useUnit } from "effector-react";
import {
  $isOpenBucket,
  onChangeIsOpenBucket
} from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import LineBlock from "../../../components/common/LineBlock";
import BucketCard from "../../../components/bucket/BucketCard";
import CustomButton from "../../../components/common/CustomButton";

const Bucket = () => {

  const isOpenBucket = useUnit($isOpenBucket)
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        onChangeIsOpenBucket(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (isOpenBucket) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '10px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpenBucket])

  return (
    <div className={`bucket ${isOpenBucket ? 'bucket-active' : ''}`}>
      <div
        className={`bucket-inside ${isOpenBucket ? 'bucket-inside-active' : ''}`}
        ref={ref}
      >

        <div className="bucket-inside-top">
          <h2>
            ваш заказ
          </h2>
          <div
            className="bucket-inside-top-close"
            onClick={() => onChangeIsOpenBucket(false)}>
            <CrossIcon />
          </div>
        </div>

        <div className="bucket-inside-empty">
          Корзина пуста. Добавьте в корзину хотя бы один товар
        </div>

        <LineBlock />

        <div className="bucket-inside-main">
          <BucketCard isWithCounter={true}/>
          <BucketCard isWithCounter={true}/>
          <BucketCard isWithCounter={true}/>
          <BucketCard isWithCounter={true}/>
        </div>

        <LineBlock />

        <div className="bucket-inside-bottom">
          <h4>
            Сумма к оплате: 35 700 руб
          </h4>
          <CustomButton
            title={'Оформить заказ'}
            padding={'24px 0'}
            maxWidth={"100%"}
            backColor={'rgba(34, 34, 34, 1)'}
            color={'rgba(255, 255, 255, 1)'}
          />
        </div>
      </div>
    </div>
  );
};

export default Bucket;
