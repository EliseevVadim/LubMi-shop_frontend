import React, { useEffect, useState } from 'react';
import { useUnit } from "effector-react";
import { $productModal, setProductModal } from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import ProductArrowToLeft from "../../../assets/icons/ProductArrowToLeft";
import CrossIcon from "../../../assets/icons/CrossIcon";
import Slider from "react-slick";
import testImage from '../../../../public/test-image-card.png'
import Image from "next/dist/client/legacy/image";
import CustomButton from "../../../components/common/CustomButton";
import FavoriteIcon from "../../../assets/icons/FavoriteIcon";
import SelectorBlock from "../../../components/catalog/SelectorBlock";

const ProductModal = () => {

  const productModal = useUnit($productModal)

  const [mainImage, setMainImage] = useState<any>(testImage);

  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    dots: false,
    infinite: false,
    variableHeight: true,
    variableWidth: true,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (!!productModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '10px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [productModal])

  return (
    <div className={`product-modal ${productModal ? 'product-modal-open' : ''}`}>
      <MaxWithLayout>
        <div className="product-modal-top">
          <div className="product-modal-top-back" onClick={() => setProductModal('')}>
            <ProductArrowToLeft />
            Назад
          </div>
          <div className="product-modal-top-close" onClick={() => setProductModal('')}>
            <CrossIcon />
          </div>
        </div>
        <div className="product-modal-main">
          <div className="product-modal-main-img">
            <div className="product-modal-main-img-slider">
              <Slider {...settings}>
                {Array.from(Array(10))?.map((image: any, index: any) => (
                  <div
                    key={index}
                    className="product-modal-main-img-slider-img"
                    onClick={() => setMainImage(testImage)}
                  >
                    <Image
                      src={testImage}
                      alt={image?.alt}
                      title={image?.name}
                      layout={'fill'}
                      objectFit={'cover'}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="product-modal-main-img-main">
              <Image
                src={mainImage}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
          </div>

          <div className="product-modal-main-text">
            <h1>
              Костюм шелковый (черный)
            </h1>
            <h2>
              Артикул: 1020345678
            </h2>
            <p>
              11 900 руб.
            </p>
            <div className="product-modal-main-text-size">
              Размер:
              <div className="product-modal-main-text-size-inside">
                <SelectorBlock/>
                <h6>
                  Нет в наличии
                </h6>
              </div>
            </div>
            <div className="product-modal-main-text-buttons">
              <CustomButton
                title={'Добавить в корзину'}
                padding={'24px 0'}
                maxWidth={359}
                backColor={'rgba(34, 34, 34, 1)'}
                color={'rgba(255, 255, 255, 1)'}
              />
              <div className="product-modal-main-text-buttons-favorite">
                <FavoriteIcon />
              </div>
            </div>
            <div className="product-modal-main-text-desc">
              Тут должно быть описание товара
            </div>
          </div>
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default ProductModal;
