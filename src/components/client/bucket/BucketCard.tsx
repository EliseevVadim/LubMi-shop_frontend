import React, { FC, PropsWithChildren } from 'react';
import bucketTest from '../../../../public/bucket-test-img.png'
import Image from "next/dist/client/legacy/image";
import BucketCrossIcon from "../../../assets/icons/BucketCrossIcon";
import Counter from "../common/Counter";

interface ICount {
  isWithCounter: boolean
}

const BucketCard: FC<PropsWithChildren<ICount>> = ({
                      isWithCounter = false,
                    }) => {

  return (
    <div className="bucket-card">
      <div className="bucket-card-img">
        <Image
          src={bucketTest}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>
      <div className="bucket-card-main">
        <h3>
          Костюм шелковый
          (кофейный)
        </h3>
        <h4>
          Артикул: 1020345678 <br />
          Размер: М
        </h4>
        <p>
          11 900 руб.
        </p>
      </div>
      <div className="bucket-card-buttons">
        <div className="bucket-card-buttons-close">
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
