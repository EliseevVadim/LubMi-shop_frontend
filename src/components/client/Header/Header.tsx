import React, { useState } from 'react';
import headerLogo from '../../../../public/header-logo.png'
import Image from "next/dist/client/legacy/image";
import SearchIcon from "../../../assets/icons/SearchIcon";
import FavoriteIcon, { FavoriteFillIcon } from "../../../assets/icons/FavoriteIcon";
import BucketIcon, { BucketFillIcon } from "../../../assets/icons/BucketIcon";
import BurgerIcon from "../../../assets/icons/BurgerIcon";
import { useRouter } from "next/router";
import {
  $isOpenFavorite,
  onChangeIsOpenBucket,
  onChangeIsOpenFavorite,
  onChangeIsOpenMobMenu,
  onChangeIsOpenSearch
} from "../../../entety/modals/model/index";
import Link from "next/link";
import { useUnit } from "effector-react";
import { $favorites } from "../../../entety/client/favorite/model";
import { $bucket } from "../../../entety/client/bucket/model";
import Logo from "../../../assets/icons/Logo";

const Header = () => {

  const router = useRouter()

  const [bucket, favorites] = useUnit([$bucket, $favorites])

  const isBucketEmpty = bucket?.length === 0
  const isFavoritesEmpty = favorites?.length === 0

  const nav: any = [
    {
      id: 1,
      path: '/catalog',
      title: 'Каталог'
    },
    {
      id: 2,
      path: '/perfumery',
      title: 'Парфюмерия'
    },
    {
      id: 3,
      path: '/delivery',
      title: 'Доставка и оплата'
    },
    {
      id: 4,
      path: '/care',
      title: 'Уход'
    },
    {
      id: 5,
      path: '/contacts',
      title: 'Контакты'
    },
    {
      id: 6,
      path: '/about',
      title: 'О компании'
    },
  ]

  return (
    <div className="header">
      <div className="header-wrap">
        <Link href='/' className="header-logo">
          {/*<Image*/}
          {/*  src={headerLogo}*/}
          {/*/>*/}
          <Logo/>
        </Link>
        <ul className="header-nav">
          {
            nav.map((item: any) =>
              <li>
                <Link
                  href={item.path}
                  style={{
                    fontWeight: router.pathname === item.path ? 400 : 300
                  }}
                >
                  {item.title}
                </Link>
              </li>
            )
          }
        </ul>
        <div className="header-icons">
          <button
            onClick={() => onChangeIsOpenSearch(true)}
          >
            <SearchIcon />
          </button>
          <button
            onClick={() => onChangeIsOpenFavorite(true)}
          >
            {
              isFavoritesEmpty
                ? <FavoriteIcon />
                : <FavoriteFillIcon />
            }
          </button>
          <button
            onClick={() => onChangeIsOpenBucket(true)}
          >
            {
              isBucketEmpty
                ? <BucketIcon />
                : <BucketFillIcon />
            }
          </button>
          <button
            className="header-icons-burger"
            onClick={() => onChangeIsOpenMobMenu(true)}
          >
            <BurgerIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
