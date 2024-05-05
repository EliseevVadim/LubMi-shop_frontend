import React, { FC, PropsWithChildren } from 'react';
import bucketTest from '../../../../public/bucket-test-img.png'
import Image from "next/dist/client/legacy/image";
import BucketCrossIcon from "../../../assets/icons/BucketCrossIcon";
import Counter from "../common/Counter";
import { onChangeFavorite } from "../../../entety/client/favorite/model/index";
import { setProductModal } from "../../../entety/modals/model/index";

interface ICount {
  isWithCounter?: boolean,
  item?: any
}

const BucketCard: FC<PropsWithChildren<ICount>> = ({
                                                     isWithCounter = false,
                                                     item
                                                   }) => {

  return (
    <div className="bucket-card">
      <div className="bucket-card-img" onClick={() => setProductModal(item)}>
        <Image
          src={bucketTest}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>
      <div className="bucket-card-main">
        <h3 onClick={() => setProductModal(item)}>
          Костюм шелковый
          (кофейный)
        </h3>
        <h4>
          Артикул: {item?.article} <br />
          Размер: {item?.sizes?.map((item: any) => item?.size)?.join(',')}
        </h4>
        <div className="bucket-card-main-price">
          {item?.old_price &&
          <p className="bucket-card-main-price-descount">
            {item?.old_price?.split('.')[0]} руб.
          </p>
          }
          <p className="bucket-card-main-price-main">
            {item?.actual_price?.split('.')[0]} руб.
          </p>
        </div>
      </div>
      <div className="bucket-card-buttons">
        <div className="bucket-card-buttons-close" onClick={() => isWithCounter ? {} : onChangeFavorite(item)}>
          <BucketCrossIcon />
        </div>
        {isWithCounter &&
        <div className="bucket-card-buttons-counter">
            <Counter />
        </div>
        }
      </div>
    </div>
  );
};

export default BucketCard;
