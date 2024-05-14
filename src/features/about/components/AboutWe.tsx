import React, { FC, PropsWithChildren } from 'react';
import Slider from "react-slick";
import Image from "next/dist/client/legacy/image";

const AboutWe: FC<PropsWithChildren<any>> = ({
                   data
                 }) => {

  const settings = {
    arrows: false,
    dots: false,
    infinite: data?.length >= 5 ? true : false,
    variableWidth: true,
    slidesToScroll: 1,
  };

  return (
    <div className="about-we">

      <h2>
        нас выбирают
      </h2>

      <Slider {...settings}>
        {
          data?.map((item: any) =>
            <div className="about-we-slide" id={item?.id}>
              <div className="about-we-slide-img">
                <Image
                  src={item?.image}
                  layout={'fill'}
                  objectFit={'cover'}
                />
              </div>
             <div className="about-we-slide-text">
               <h3>
                 {item?.label}
               </h3>
               <p>
                 {item?.description}
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
