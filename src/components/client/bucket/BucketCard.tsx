import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import Image from "next/dist/client/legacy/image";
import BucketCrossIcon from "../../../assets/icons/BucketCrossIcon";
import Counter from "../common/Counter";
import { onChangeFavorite } from "../../../entety/client/favorite/model";
import { setProductModal } from "../../../entety/modals/model";
import { removeFromBucketEvent } from "../../../entety/client/bucket/model";
import CustomButton from "../common/CustomButton";
import TimeIcon from "../../../assets/icons/TimeIcon";

interface ICount {
  isWithCounter?: boolean,
  withTimerLogic?: boolean,
  withOldPrice?: boolean,
  item?: any
}

const BucketCard: FC<PropsWithChildren<ICount>> = ({
                                                     isWithCounter = false,
                                                     withOldPrice = true,
                                                     withTimerLogic = false,
                                                     item
                                                   }) => {

  const [isTimer, setIsTimer] = useState<boolean>(false)

  const onChangeTimerBlock = () => {
    if (withTimerLogic) {
      setIsTimer(!isTimer)
    } else {
      onChangeFavorite(item)
    }
  }

  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    let interval: any;
    const handleInterval = () => {
      setTimer(prevTimer => prevTimer - 1);
    };
    if (isTimer) {
      interval = setInterval(handleInterval, 1000);
    }
    return () => {
      clearInterval(interval);
      setTimer(5);
    };
  }, [isTimer]);

  useEffect(() => {
    if (timer === 0 && isTimer) {
      removeFromBucketEvent(item)
      setIsTimer(false)
    }
  }, [timer]);

  return (
    <div>
      {
        isTimer
          ?
          <div className="bucket-timer">
            <div className="bucket-timer-left">
              <h5>
                {item?.title}
              </h5>
              <CustomButton
                onClick={onChangeTimerBlock}
                title={'Вернуть'}
                padding={'15px 0'}
                maxWidth={'212px'}
                backColor={'rgba(34, 34, 34, 1)'}
                color={'rgba(255, 255, 255, 1)'}
              />
            </div>
            <div className="bucket-timer-right">
              {timer}
              <TimeIcon />
            </div>
          </div>
          :
          <div className="bucket-card">
            <div className="bucket-card-img" onClick={() => setProductModal(item)}>
              <Image
                src={item?.primary_image?.image}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
            <div className="bucket-card-main">
              <h3 onClick={() => setProductModal(item)}>
                {item?.title}
              </h3>
              <h4>
                Артикул: {item?.article} <br />
                Размер: {' '}
                {
                  isWithCounter
                    ? item?.size?.size
                    : item?.sizes?.map((item: any) => item?.size)?.join(',')
                }
              </h4>
              <div className="bucket-card-main-price">
                {item?.old_price && withOldPrice &&
                <p className="bucket-card-main-price-descount">
                  {Number(item?.old_price?.split('.')?.[0]) * (item?.quantity ? item?.quantity : 1)} р.
                </p>
                }
                <p className="bucket-card-main-price-main">
                  {Number(item?.actual_price?.split('.')?.[0]) * (item?.quantity ? item?.quantity : 1)} р.
                </p>
              </div>
            </div>
            <div className="bucket-card-buttons">
              <div className="bucket-card-buttons-close"
                   onClick={() => onChangeTimerBlock()}>
                <BucketCrossIcon />
              </div>
              {isWithCounter &&
              <div className="bucket-card-buttons-counter">
                  <Counter item={item} handleLessThanOne={setIsTimer}/>
              </div>
              }
            </div>
          </div>
      }
    </div>
  );
};

export default BucketCard;
