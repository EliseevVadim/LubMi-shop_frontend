import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import footerLogo from '../../../../public/footer-logo.png'
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
            <a href="tel:+7 918 008-28-91">
              +7 918 008-28-91
            </a>
            <a href="mailto:lubavamishankova@mail.ru">
              lubavamishankova@mail.ru
            </a>
          </div>
          <div className="footer-main-menus">
            <div className="footer-main-menus-block">
              <h3>
                Покупателям
              </h3>

              <div className="footer-main-menus-block-list">
                <Link href={'/delivery'}>
                  Доставка и оплата
                </Link>
                <Link href={'/sizes'}>
                  Таблица размеров
                </Link>
                <a href={'https://goodiets.com/base'}>
                  База поставщиков
                </a>
              </div>
            </div>
            <div className="footer-main-menus-block">
              <h3>
                Покупателям
              </h3>

              <div className="footer-main-menus-block-list">
                <Link href={'/about'}>
                  О компании
                </Link>
              </div>
            </div>

          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2024 — Copyright
          </p>
          <div className="footer-bottom-social">
            <Social />
          </div>
          <div className="footer-bottom-links">
            <a href="https://drive.google.com/drive/folders/1G9zhjjilXRbhpyiD1S8ORFAOvHN5_K39?usp=share_link" target="_blank">
              Политика конфиденциальности
            </a>
            <a href="https://drive.google.com/drive/folders/1fISBREJ27EQ3TtlK7RzWHlyExiESUwBQ?usp=share_link" target="_blank">
              Публичная оферта
            </a>
          </div>
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default Footer;
