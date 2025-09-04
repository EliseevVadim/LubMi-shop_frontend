import React, { FC, PropsWithChildren } from 'react';
import FavoriteWhite from "../../../assets/icons/FavoriteWhite";
import FavoriteWhiteFill from "../../../assets/icons/FavoriteWhiteFill";
import { onChangeIsOpenLeaveMessage, setProductModal } from "@/entety/modals/model";
import { $favorites, onChangeFavorite } from "@/entety/client/favorite/model";
import { useStoreMap, useUnit } from "effector-react";
import { useAlert } from "@/controllers/AlertNotification";
import ProductSkeletonImage from "@/components/client/Skeletons/ProductSkeletonImage";
import {useRouter} from "next/router";

const Card: FC<PropsWithChildren<{ item?: any }>> = ({ item }) => {

  const uAlert = useAlert()
  const favorites = useUnit($favorites)
  const router = useRouter();

  const isFavorite = useStoreMap({
    store: $favorites,
    keys: [item?.article],
    fn: (favorite, [itemArticle]) => favorite?.find(({ article }) => article === itemArticle) ?? null,
  });

  const addToFavorite = () => {
    let find = favorites.some((favoritesItem: any) => favoritesItem?.article === item?.article);
    if (!find){
      uAlert({
        message: 'Товар добавлен в избранное'
      })
    }
    onChangeFavorite(item)
  }

  const goToProduct = (item: any) =>{
    const currentPath = router.pathname;
    const currentQuery = router.query;
    router.replace({
      pathname: currentPath,
      query: {
        ...currentQuery,
        product: item?.article
      }
    }, undefined, { shallow: true });
    setProductModal(item)
  }

  return (
    <div className="card">
      <div className="card-img">
        {/*<Image*/}
        {/*  onClick={() => setProductModal(item)}*/}
        {/*  layout='fill'*/}
        {/*  objectFit={'cover'}*/}
        {/*  src={item?.primary_image?.image}*/}
        {/*  alt={'img-card'}*/}
        {/*/>*/}
        <ProductSkeletonImage
          onClick={() => goToProduct(item)}
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
        <div className="card-img-favorite" onClick={addToFavorite}>
          {isFavorite
            ? <FavoriteWhiteFill />
            : <FavoriteWhite />
          }
        </div>
      </div>
      <p
        className="card-title"
        onClick={() => goToProduct(item)}
      >
        {item?.title} {item?.color ? `(${item?.color})` :''}
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
          <button onClick={() => onChangeIsOpenLeaveMessage(item?.article)}>
              Сообщить о поступлении
          </button>
      </div>
      }
    </div>
  );
};

export default Card;
