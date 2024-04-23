import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import headerLogo from '../../../public/header-logo.png'
import Image from "next/dist/client/legacy/image";
import Link from "next/link";
import SearchIcon from "../../assets/icons/SearchIcon";
import FavoriteIcon from "../../assets/icons/FavoriteIcon";
import BucketIcon from "../../assets/icons/BucketIcon";
import BurgerIcon from "../../assets/icons/BurgerIcon";

const Header = () => {

  const nav: any = [
    {
      id: 1,
      path: '/',
      title: 'Каталог'
    },
    {
      id: 2,
      path: '/',
      title: 'Парфюмерия'
    },
    {
      id: 3,
      path: '/',
      title: 'Доставка и оплата'
    },
    {
      id: 4,
      path: '/',
      title: 'Уход'
    },
    {
      id: 5,
      path: '/',
      title: 'Контакты'
    },
    {
      id: 5,
      path: '/',
      title: 'О компании'
    },
  ]

  return (
    <div className="header">
      <div className="header-wrap">
        <div className="header-logo">
          <Image
            src={headerLogo}
          />
        </div>
        <ul className="header-nav">
          {
            nav.map((item: any) =>
              <li>
                <Link href={item.path}>
                  {item.title}
                </Link>
              </li>
            )
          }
        </ul>
        <div className="header-icons">
          <button>
            <SearchIcon />
          </button>
          <button>
            <FavoriteIcon />
          </button>
          <button>
            <BucketIcon />
          </button>
          <button className="header-icons-burger">
            <BurgerIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
