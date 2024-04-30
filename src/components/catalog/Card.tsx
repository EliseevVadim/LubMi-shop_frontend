import React from 'react';
import testImage from '../../../public/test-image-card.png'
import Image from "next/dist/client/legacy/image";
import FavoriteWhite from "../../assets/icons/FavoriteWhite";
import FavoriteWhiteFill from "../../assets/icons/FavoriteWhiteFill";
import { useAlert } from "../../controllers/AlertNotification/index";
import { onChangeIsOpenLeaveMessage, setProductModal } from "../../entety/modals/model/index";

const Card = () => {

  return (
    <div className="card">
      <div className="card-img">
        <Image
          onClick={() => setProductModal('1')}
          layout={'fill'}
          objectFit={'cover'}
          src={testImage}
        />
        <div className="card-img-new">
          Новинка
        </div>
        <div className="card-img-favorite">
          <FavoriteWhite />
          <FavoriteWhiteFill />
        </div>
      </div>
      <div
        className="card-title"
        onClick={() => setProductModal('1')}
      >
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
        <button onClick={() => onChangeIsOpenLeaveMessage(true)}>
          Сообщить о поступлении
        </button>
      </div>
    </div>
  );
};

export default Card;
