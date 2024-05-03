import React, { useEffect, useRef } from 'react';
import { useUnit } from "effector-react";
import {
  $isOpenFavorite,
  onChangeIsOpenFavorite,
} from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import LineBlock from "../../../components/client/common/LineBlock";
import BucketCard from "../../../components/client/bucket/BucketCard";

const Favorite = () => {

  const isOpenFavorite = useUnit($isOpenFavorite)
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        onChangeIsOpenFavorite(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (isOpenFavorite) {
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
  }, [isOpenFavorite])

  return (
    <div className={`favorite ${isOpenFavorite ? 'favorite-active' : ''}`}>
      <div
        className={`favorite-inside ${isOpenFavorite ? 'favorite-inside-active' : ''}`}
        ref={ref}
      >

        <div className="favorite-inside-top">
          <h2>
            Избранное
          </h2>
          <div
            className="favorite-inside-top-close"
            onClick={() => onChangeIsOpenFavorite(false)}>
            <CrossIcon />
          </div>
        </div>

        <LineBlock />

        <div className="favorite-inside-main">
          <BucketCard />
          <BucketCard />
          <BucketCard />
          <BucketCard />
          <BucketCard />
          <BucketCard />
          <BucketCard />
        </div>

      </div>
    </div>
  );
};

export default Favorite;
