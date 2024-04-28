import React from 'react';
import aboutMain from '../../../../public/about-main.png'
import Image from "next/dist/client/legacy/image";

const AboutMain = () => {

  return (
    <div className="about-main">
      <div className="about-main-text">
        <p>
          Бренд LubMi – молодой российский бренд.
        </p>
        <p>
          Это бренд, зародившийся в мечтах маленькой девочки, которая, рисуя наряды своим куклам фантазировала о
          собственной коллекции одежды. И теперь, когда девочка выросла, её мечта осуществилась!
        </p>
        <p>
          Главная цель создателя Бренда LubMi – Любавы, это помочь в осуществлении девичьих желаний, ведь каждая девушка
          и женщина желает чувствовать себя красивой, утонченной, элегантной, женственной в любое время и в любом месте.
        </p>
        <p>
          Одеваться красиво, чувствовать себя уверенно в образах, которые еще больше подчеркивают природную женскую
          красоту – это всё о бренде LubMi.
        </p>
        <p>
          Надевая одежду от LubMi вы проявляете истинную любовь к себе!
        </p>
      </div>
      <div className="about-main-img">
        <Image
          src={aboutMain}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>
    </div>
  );
};

export default AboutMain;
