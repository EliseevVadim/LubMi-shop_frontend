import React, { useEffect, useRef } from 'react';
import { useUnit } from "effector-react";
import { $isOpenMobMenu, onChangeIsOpenMobMenu } from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import Social from "../../../components/client/common/Social";

const MobMenu = () => {

  const isOpenMobMenu = useUnit($isOpenMobMenu)
  const ref = useRef<any>(null);
  const router = useRouter()

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
      title: 'Уход и состав'
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        onChangeIsOpenMobMenu(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (isOpenMobMenu) {
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
  }, [isOpenMobMenu])

  return (
    <div className={`mob-menu ${isOpenMobMenu ? 'mob-menu-active' : ''}`}>
      <div
        className={`mob-menu-inside ${isOpenMobMenu ? 'mob-menu-inside-active' : ''}`}
        ref={ref}
      >
        <div className="mob-menu-inside-top">
          <div
            className="mob-menu-inside-top-close"
            onClick={() => onChangeIsOpenMobMenu(false)}
          >
            <CrossIcon />
          </div>
          <ul>
            {
              nav.map((item: any) =>
                <li onClick={() =>  onChangeIsOpenMobMenu(false)}>
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
        </div>
        <div className="mob-menu-inside-top-soc">
          <Social />
        </div>
      </div>
    </div>
  );
};

export default MobMenu;
