import React, { useEffect, useRef } from 'react';
import { useStoreMap, useUnit } from "effector-react";
import {
  $isOpenBucket,
  onChangeIsOpenBucket, onChangeIsOpenCheckout
} from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import LineBlock from "../../../components/client/common/LineBlock";
import BucketCard from "../../../components/client/bucket/BucketCard";
import CustomButton from "../../../components/client/common/CustomButton";
import { $bucket, $bucketCalculated, CalculateBucketFx } from "../../client/bucket/model/index";
import { Skeleton } from "antd";

const Bucket = () => {

  const [
    isOpenBucket,
    bucket,
    bucketCalculated,
    isLoadingCalculate
  ] = useUnit([
    $isOpenBucket,
    $bucket,
    $bucketCalculated,
    CalculateBucketFx.pending
  ])
  const ref = useRef<any>(null);

  useEffect(() => {
    CalculateBucketFx()
  }, [])

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
      document.body.style.paddingRight = '4px';
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

        <LineBlock />
        {bucket?.length !== 0
          ?
          <>
            <div className="bucket-inside-main">
              {
                bucket?.map((item: any) =>
                  <BucketCard isWithCounter={true} item={item} />
                )
              }
            </div>
            <LineBlock />
            <div className="bucket-inside-bottom">
              <h4>
                Сумма к оплате: {' '}
                {
                  isLoadingCalculate
                    ? <Skeleton.Button active={false} size={'small'} />
                    : `${bucketCalculated?.price} руб`
                }
              </h4>
              <CustomButton
                onClick={() => {
                  onChangeIsOpenCheckout(true)
                  onChangeIsOpenBucket(false)
                }}
                title={'Оформить заказ'}
                padding={'24px 0'}
                maxWidth={"100%"}
                backColor={'rgba(34, 34, 34, 1)'}
                color={'rgba(255, 255, 255, 1)'}
              />
            </div>
          </>
          :
          <div className="bucket-inside-empty">
            Корзина пуста. Добавьте в корзину хотя бы один товар
          </div>
        }


      </div>
    </div>
  );
};

export default Bucket;
