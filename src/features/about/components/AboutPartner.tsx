import React from 'react';
import Slider from "react-slick";
import aboutPartner from '../../../../public/about-partner-test.png'
import Image from "next/dist/client/legacy/image";

const AboutPartner = () => {

  const slides = [1, 2, 3]

  let slider: any;

  const settings = {
    arrows: false,
    dots: false,
    infinite: slides?.length >= 5 ? true : false,
    variableWidth: true,
    slidesToScroll: 1,
  };

  return (
    <div className="about-partner">
      <h2>
        партнеры
      </h2>

      <Slider ref={(c) => (slider = c)} {...settings}>
        {
          slides?.map((item: any) =>
            <div className="about-partner-slide" id={item?.id}>
              <Image
                src={aboutPartner}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
          )
        }
      </Slider>
    </div>
  );
};

export default AboutPartner;
