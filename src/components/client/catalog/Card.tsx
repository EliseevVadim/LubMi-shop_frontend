import React, { FC, PropsWithChildren } from 'react';
import Image from "next/dist/client/legacy/image";
import FavoriteWhite from "../../../assets/icons/FavoriteWhite";
import FavoriteWhiteFill from "../../../assets/icons/FavoriteWhiteFill";
import { onChangeIsOpenLeaveMessage, setProductModal } from "../../../entety/modals/model/index";
import { $favorites, onChangeFavorite } from "../../../entety/client/favorite/model/index";
import { useStoreMap } from "effector-react";

const Card: FC<PropsWithChildren<{ item?: any }>> = ({ item }) => {


  const isFavorite = useStoreMap({
    store: $favorites,
    keys: [item?.article],
    fn: (favorite, [itemArticle]) => favorite?.find(({ article }) => article === itemArticle) ?? null,
  });

  return (
    <div className="card">
      <div className="card-img">
        <Image
          onClick={() => setProductModal(item)}
          layout='fill'
          objectFit={'cover'}
          src={item?.primary_image?.image}
          alt={'img-card'}
        />
        {
          item?.novelty &&
          <p className="card-img-new">
              Новинка
          </p>
        }
        <div className="card-img-favorite" onClick={() => onChangeFavorite(item)}>
          {isFavorite
            ? <FavoriteWhiteFill />
            : <FavoriteWhite />
          }
        </div>
      </div>
      <p
        className="card-title"
        onClick={() => setProductModal(item)}
      >
        {item?.title}
      </p>
      <div className="card-price">
        {item?.old_price &&
        <p className="card-price-descount">
          {item?.old_price?.split('.')[0]} руб.
        </p>
        }
        <p className="card-price-main">
          {item?.actual_price?.split('.')[0]} руб.
        </p>
      </div>
      {!item?.in_stock &&
      <div className="card-is-exist">
          <p>
              Нет в наличии
          </p>
          <button onClick={() => onChangeIsOpenLeaveMessage(true)}>
              Сообщить о поступлении
          </button>
      </div>
      }
    </div>
  );
};

export default Card;
