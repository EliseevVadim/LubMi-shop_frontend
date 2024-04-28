import React from 'react';
import Slider from "react-slick";
import aboutUs from '../../../../public/about-us-test-slide.png'
import Image from "next/dist/client/legacy/image";

const AboutWe = () => {

  const slides = [1,2,3]

  let slider: any;

  const settings = {
    arrows: false,
    dots: false,
    variableWidth: true,
    slidesToScroll: 1,
  };

  return (
    <div className="about-we">

      <h2>
        нас выбирают
      </h2>

      <Slider ref={(c) => (slider = c)} {...settings}>
        {
          slides?.map((item: any) =>
            <div className="about-we-slide" id={item?.id}>
              <div className="about-we-slide-img">
                <Image
                  src={aboutUs}
                  layout={'fill'}
                  objectFit={'cover'}
                />
              </div>
             <div className="about-we-slide-text">
               <h3>
                 Анна Иванова
               </h3>
               <p>
                 Стилист, блогер {item}
               </p>
             </div>
            </div>
          )
        }
      </Slider>
    </div>
  );
};

export default AboutWe;
