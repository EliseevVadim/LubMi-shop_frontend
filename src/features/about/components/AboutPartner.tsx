import React, { FC, PropsWithChildren } from 'react';
import Slider from "react-slick";
import Image from "next/dist/client/legacy/image";

const AboutPartner: FC<PropsWithChildren<any>> = ({
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
    <div className="about-partner">
      <h2>
        партнеры
      </h2>

      <Slider {...settings}>
        {
          data?.map((item: any) =>
            <a href={item?.link} className="about-partner-slide" id={item?.id} target="_blank">
              <Image
                src={item?.image}
                layout={'fill'}
                objectFit={'cover'}
              />
            </a>
          )
        }
      </Slider>
    </div>
  );
};

export default AboutPartner;
