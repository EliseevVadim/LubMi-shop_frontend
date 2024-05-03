import React from 'react';
import styles from './style.module.scss';
import { theme, Typography } from "antd";
import Link from "next/link";
import { logout } from "../../../entety/admin/user/model/index";

const { useToken } = theme;
const { Title } = Typography;

const SideBarNav = () => {

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
    <div className={styles.bar}>
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
        <div className={styles.mainNav}  onClick={() => logout()}>
          <button>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
