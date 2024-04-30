import React from 'react';
import testImage from '../../../public/test-image-card.png'
import Image from "next/dist/client/legacy/image";
import FavoriteWhite from "../../assets/icons/FavoriteWhite";
import FavoriteWhiteFill from "../../assets/icons/FavoriteWhiteFill";
import { useAlert } from "../../controllers/AlertNotification/index";

const Card = () => {

  const uAlert = useAlert()

  return (
    <div className="card" onClick={() =>
      uAlert({
        message: 'Товар добавлен в избранное'
      })
    }>
      <div className="card-img">
        <Image
          layout={'fill'}
          objectFit={'cover'}
          src={testImage}
        />
        <div className="card-img-new">
          Новинка
        </div>
        <div className="card-img-favorite">
          <FavoriteWhite/>
          <FavoriteWhiteFill/>
        </div>
      </div>
      <div className="card-title">
        Костюм шелковый (черный)
      </div>
      <div className="card-price">
        <div className="card-price-descount">
          15 900 руб.
        </div>
        <div className="card-price-main">
          11 900 руб.
        </div>
      </div>
      <div className="card-is-exist">
        <p>
          Нет в наличии
        </p>
        <button>
          Сообщить о поступлении
        </button>
      </div>
    </div>
  );
};

export default Card;
