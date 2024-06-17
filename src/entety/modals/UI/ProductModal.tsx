import React, { useEffect, useState } from 'react';
import { useStoreMap, useUnit } from "effector-react";
import { $productModal, onChangeIsOpenBucket, onChangeIsOpenSearch, setProductModal } from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import ProductArrowToLeft from "../../../assets/icons/ProductArrowToLeft";
import Slider from "react-slick";
import Image from "next/dist/client/legacy/image";
import CustomButton from "../../../components/client/common/CustomButton";
import FavoriteIcon from "../../../assets/icons/FavoriteIcon";
import SelectorBlock from "../../../components/client/catalog/SelectorBlock";
import { api } from "@/api/ApiWithoutToken";
import { useAlert } from "@/controllers/AlertNotification";
import { Spin } from "antd";
import { $favorites, onChangeFavorite } from "@/entety/client/favorite/model";
import FavoriteIconFill from "../../../assets/icons/FavoriteIconFill";
import { $bucket, addToBucketEvent } from "@/entety/client/bucket/model";

const ProductModal = () => {

  const [productModal, favorites, bucket] = useUnit([$productModal, $favorites, $bucket])
  const uAlert = useAlert()

  useEffect(() => {
    if (!productModal?.article) return
    setIsLoading(true)
    api.get(`/products/${productModal?.article}/`)
      .then((response) => {
        setProductData(response?.data)
        setMainImage(response?.data?.images[0]?.image)
      })
      .catch(() => {
        uAlert({
          message: 'Произошла ошибка. Попробуйте позже'
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [productModal.article])

  const [mainImage, setMainImage] = useState<any>(null);
  const [productData, setProductData] = useState<any>({})
  const [selectedSize, setSelectedSize] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const addToFavorite = () => {
    let find = favorites.some((favoritesItem: any) => favoritesItem?.article === productModal?.article);
    if (!find){
      uAlert({
        message: 'Товар добавлен в избранное'
      })
    }
    onChangeFavorite(productModal)
  }

  const handleAddToBucket = () =>{
    let promise = bucket.find((item: any) => item?.article === productModal?.article && item?.size?.id === selectedSize?.id);
    if (promise?.article && Number(promise?.quantity) === Number(promise?.size?.quantity)){
      uAlert({
        message: `Извините, достигнут лимит. Это максимально возможное количество товаров в наличии`
      })
    } else {
      addToBucketEvent({
        ...productModal,
        article: productModal.article,
        size: selectedSize,
        quantity: 1,
      })
      onChangeIsOpenSearch(false)
      setProductModal(false)
      onChangeIsOpenBucket(true)
    }
  }

  const isFavorite = useStoreMap({
    store: $favorites,
    keys: [productData?.article],
    fn: (favorite, [itemArticle]) => favorite?.find(({ article }) => article === itemArticle) ?? null,
  });

  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    infinite: false,
    variableHeight: true,
    slidesToScroll: 2,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: false,
          vertical: false,
          verticalSwiping: false,
          variableWidth: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (!!productModal.article) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '4px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [productModal.article])

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.keyCode === 27) {
        setProductModal({})
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  console.log(productData)
  return (
    <div className={`product-modal ${productModal?.article ? 'product-modal-open' : ''}`}>
      <MaxWithLayout>
        <div className="product-modal-top">
          <div className="product-modal-top-back" onClick={() => setProductModal({})}>
            <ProductArrowToLeft />
            Назад
          </div>
          {/*<div className="product-modal-top-close" onClick={() => setProductModal({})}>*/}
          {/*  <CrossIcon />*/}
          {/*</div>*/}
        </div>
        {isLoading
          ?
          <div
            style={{ width: '100%', justifyContent: "center", alignItems: "center", display: "flex", marginTop: 100 }}>
            <Spin />
          </div>
          :
          <div className="product-modal-main">
            <div className="product-modal-main-img">
              <div className="product-modal-main-img-slider">
                <Slider {...settings}>
                  {productData?.images?.map((image: any, index: any) => (
                    <div
                      key={index}
                      className="product-modal-main-img-slider-img"
                      onClick={() => setMainImage(image?.image)}
                    >
                      <Image
                        src={image?.image}
                        layout={'fill'}
                        objectFit={'cover'}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="product-modal-main-img-main">
                {mainImage &&
                <Image
                    src={mainImage}
                    layout={'fill'}
                    objectFit={'cover'}
                />
                }
              </div>
            </div>

            <div className="product-modal-main-text">
              <h1>
                {productData?.title}
              </h1>
              <h2>
                Артикул: {productData?.article}
              </h2>
              <p>
                {productData?.actual_price?.split('.')?.[0]} руб.
              </p>
              <div className="product-modal-main-text-size">
                {
                    productData?.sizes?.length !== 0 && 'Размер:'
                }
                <div className="product-modal-main-text-size-inside">
                  {
                    productData?.sizes?.length !== 0 &&
                    <SelectorBlock
                        items={productData?.sizes}
                        setSelectedItem={setSelectedSize}
                        selectedItem={selectedSize}
                    />
                  }
                  {
                    (selectedSize?.quantity === 0 || productData?.sizes?.length === 0) &&
                    <h6>
                        Нет в наличии
                    </h6>
                  }
                </div>
              </div>
              <div className="product-modal-main-text-buttons">
                <CustomButton
                  disable={selectedSize?.quantity <= 0 || !selectedSize || productData?.sizes?.length === 0}
                  // onClick={() => console.log({
                  //   article: productModal.article,
                  //   size: selectedSize?.id,
                  //   quantity: 1
                  // })}
                  onClick={handleAddToBucket}
                  title={'Добавить в корзину'}
                  padding={'24px 0'}
                  maxWidth={359}
                  backColor={'rgba(34, 34, 34, 1)'}
                  color={'rgba(255, 255, 255, 1)'}
                />
                <div className="product-modal-main-text-buttons-favorite"
                     onClick={addToFavorite}>
                  {
                    isFavorite
                      ?
                      <FavoriteIconFill />
                      : <FavoriteIcon />
                  }
                </div>
              </div>
              <div className="product-modal-main-text-desc">
                {productData?.description}
              </div>
            </div>
          </div>
        }

      </MaxWithLayout>
    </div>
  );
};

export default ProductModal;
