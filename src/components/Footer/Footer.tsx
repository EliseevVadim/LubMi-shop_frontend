import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import footerLogo from '../../../public/footer-logo.png'
import Image from "next/dist/client/legacy/image";
import Link from "next/link";
import Social from "../common/Social";

const Footer = () => {

  return (
    <MaxWithLayout>
      <div className="footer">
        <div className="footer-main">
          <div className="footer-main-info">
            <div className="footer-main-info-img">
              <Image
                src={footerLogo}
              />
            </div>
            <a href="tel:+1 891 989-11-91">
              +1 891 989-11-91
            </a>
            <a href="mailto:hello@logoipsum.com">
              hello@logoipsum.com
            </a>
          </div>
          <div className="footer-main-menus">
            <div className="footer-main-menus-block">
              <h3>
                Покупателям
              </h3>

              <div className="footer-main-menus-block-list">
                <Link href={''}>
                  Доставка и оплата
                </Link>
                <Link href={''}>
                  Таблица размеров
                </Link>
                <Link href={''}>
                  База поставщиков
                </Link>
              </div>
            </div>
            <div className="footer-main-menus-block">
              <h3>
                Покупателям
              </h3>

              <div className="footer-main-menus-block-list">
                <Link href={''}>
                  О компании
                </Link>
              </div>
            </div>

          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2023 — Copyright
          </p>
          <div className="footer-bottom-social">
            <Social />
          </div>
          <div className="footer-bottom-links">
            <a href="">
              Политика конфиденциальности
            </a>
            <a href="">
              Публичная оферта
            </a>
          </div>
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default Footer;
