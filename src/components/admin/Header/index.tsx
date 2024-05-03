import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { theme, Typography } from "antd";
import { useUnit } from "effector-react";
import { $user, logout } from "../../../entety/admin/user/model/index";
import BurgerIcon from "../../../assets/icons/BurgerIcon";
import Link from "next/link";

const { Title } = Typography;
const { useToken } = theme;

const Header: FC<{ title?: string }> = ({ title }) => {

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [user] = useUnit([$user])
  const isUserExist = user?.username
  const { token } = useToken();

  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        setIsOpenMenu(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const mainNav = [
    {
      title: 'Категории',
      link: '/admin/category',
    },
    {
      title: 'Категории',
      link: '/admin/category',
    },
    {
      title: 'Категории',
      link: '/admin/category',
    },
  ]

  return (
    <div className={styles['header']}>
      <div className={styles['headerMain']}>

        {
          isUserExist &&
          <div
              className={styles['headerBurger']}
              onClick={() => setIsOpenMenu(true)}
          >
              <BurgerIcon />
          </div>
        }
      </div>

      <div
        ref={ref}
        className={styles['headerNav']}
        style={{
          visibility: isOpenMenu ? "visible" : 'hidden',
          opacity: isOpenMenu ? 1 : 0,
          transform: isOpenMenu ? 'translateX(0)' : 'translateX(200px)'
        }}
      >
        <div className={styles.barWrap}>

          <p className={styles.barIcon}>
            logo
          </p>

          <div className={styles.mainNav}>
            {
              mainNav?.map((item: any) =>
                <Link href={item.link}>
                  <Title
                    level={5}
                  >
                    {item?.title}
                  </Title>
                </Link>
              )
            }
          </div>
          <div className={styles.mainNav} onClick={() => logout()}>
            <button>
              Выйти
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
