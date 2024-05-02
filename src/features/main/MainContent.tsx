import React from 'react';
import CustomButton from "../../components/common/CustomButton";
import Slider from 'react-slick';
import homeIntroOne from '../../../public/home-intro-1.png'
import homeIntroTwo from '../../../public/home-intro-2.png'
import Image from "next/dist/client/legacy/image";
import Catalog from "../../components/catalog/Catalog";
import MaxWithLayout from "../../layouts/MaxWithLayout";

const MainContent = () => {

  const slides = [
    {
      id: 1,
      image: homeIntroOne,
      text: 'новая коллекция',
      buttonText: 'Перейти в каталог',
      style: {}
    },
    {
      id: 2,
      image: homeIntroTwo,
      text: 'коллекция ароматов',
      buttonText: 'Ознакомиться',
      style: {
        maxWidth: 760,
        marginBottom: 50,
      }
    },
  ]

  let slider: any;

  const settings = {
    arrows: false,
    // autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true
        }
      },
    ]
  };


  return (
    <div className="home">
      <div className="home-slider">
        <Slider ref={(c) => (slider = c)} {...settings} >
          {
            slides?.map((item: any, index: any) =>
              <div className="home-slider-item">
                <Image
                  layout={'fill'}
                  objectFit={'cover'}
                  src={item?.image}
                />
                <div className="home-slider-item-inner">
                  <h2 style={item.style}>
                    {item.text}
                  </h2>
                  <CustomButton
                    padding={'24px 0'}
                    maxWidth={341}
                    title={item.buttonText}
                  />
                </div>
              </div>
            )
          }
        </Slider>

      </div>

      <div className="home-catalog">
        <Catalog />
      </div>

      <div className="home-catalog">
        <Catalog title={'Бестселлеры'}/>
      </div>

      <div className="home-banner">
        <MaxWithLayout>
          <div className="home-banner-inner">
            <h2>
              Парфюмерия
            </h2>
            <CustomButton
              title={'Ознакомиться'}
              padding={'24px 0'}
              maxWidth={300}
              backColor={'rgba(34, 34, 34, 1)'}
              color={'rgba(255, 255, 255, 1)'}
            />
          </div>
        </MaxWithLayout>
      </div>
    </div>
  );
};

export default MainContent;
