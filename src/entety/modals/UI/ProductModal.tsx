import React, {useEffect, useRef, useState} from 'react';
import {useStoreMap, useUnit} from "effector-react";
import {
  $productModal,
  onChangeIsOpenBucket,
  onChangeIsOpenLeaveMessage, onChangeIsOpenLeaveMessageSize,
  onChangeIsOpenSearch,
  setProductModal
} from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import ProductArrowToLeft from "../../../assets/icons/ProductArrowToLeft";
import Slider from "react-slick";
import Image from "next/dist/client/legacy/image";
import CustomButton from "../../../components/client/common/CustomButton";
import FavoriteIcon from "../../../assets/icons/FavoriteIcon";
import SelectorBlock from "../../../components/client/catalog/SelectorBlock";
import {api} from "@/api/ApiWithoutToken";
import {useAlert} from "@/controllers/AlertNotification";
import {Modal, Skeleton, Spin} from "antd";
import {$favorites, onChangeFavorite} from "@/entety/client/favorite/model";
import FavoriteIconFill from "../../../assets/icons/FavoriteIconFill";
import {$bucket, addToBucketEvent} from "@/entety/client/bucket/model";
import ProductSkeletonImage from "@/components/client/Skeletons/ProductSkeletonImage";
import {useRouter} from "next/router";

const ProductModal = () => {

  const [productModal, favorites, bucket] = useUnit([$productModal, $favorites, $bucket])
  const uAlert = useAlert()
  const router = useRouter()

  useEffect(() => {
    setIsError(false)
    if (!productModal?.article) return
    setIsLoading(true)
    api.get(`/products/${productModal?.article}/`)
      .then((response) => {
        setProductData(response?.data)
        setMainImage(0)
      })
      .catch(() => {
        uAlert({
          message: 'Произошла ошибка. Попробуйте позже'
        })
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [productModal.article])

  const [mainImage, setMainImage] = useState<any>(0);
  const [productData, setProductData] = useState<any>({})
  const [selectedSize, setSelectedSize] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const addToFavorite = () => {
    let find = favorites.some((favoritesItem: any) => favoritesItem?.article === productModal?.article);
    if (!find) {
      uAlert({
        message: 'Товар добавлен в избранное'
      })
    }
    onChangeFavorite(productModal)
  }

  const handleAddToBucket = () => {
    let promise = bucket.find((item: any) => item?.article === productModal?.article && item?.size?.id === selectedSize?.id);
    if (promise?.article && Number(promise?.quantity) === Number(promise?.size?.quantity)) {
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
      console.log('addToBucket')
      console.log({
        ...productModal,
        article: productModal.article,
        size: selectedSize,
        quantity: 1,
      })
      onChangeIsOpenSearch(false)
      setProductModal(false)
      onChangeIsOpenBucket(true)
      resetProductQuery()
    }
  }

  const isFavorite = useStoreMap({
    store: $favorites,
    keys: [productData?.article],
    fn: (favorite, [itemArticle]) => favorite?.find(({article}) => article === itemArticle) ?? null,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    infinite: false,
    variableHeight: true,
    accessibility: true,
    swipe: true,
    swipeToSlide: true,
    afterChange: (index: any) => setCurrentIndex(index),
    // slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          verticalSwiping: false,
          variableWidth: true,
          variableHeight: false,
        },
      },
    ],
  };
  const sliderRef = useRef<any>(null);

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClose = () => {
    setProductModal({})
    resetProductQuery()
  }

  const resetProductQuery = () => {
    const currentPath = router.pathname;
    const currentQuery = {...router.query};

    // Удаляем параметр product
    delete currentQuery?.product;

    router.replace({
      pathname: currentPath,
      query: currentQuery
    }, undefined, {shallow: true});
  }

  return (
    <div className={`product-modal ${productModal?.article ? 'product-modal-open' : ''}`} style={{zIndex: 999}}>
      <MaxWithLayout padding={'0 0 0 20px'}>
        <div className="product-modal-top">
          <div className="product-modal-top-back" onClick={onClose}>
            <ProductArrowToLeft/>
            Назад
          </div>
        </div>
        {isLoading
          ?
          <div
            style={{
              width: '100%',
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginTop: 100
            }}>
            <Spin/>
          </div>
          :
          isError
            ?
            <div
            style={{
              width: '100%',
              height: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 22,
            }}
            >
              Товар не найдет
            </div>
            :
            <div className="product-modal-main">
              <div className="product-modal-main-img">
                <div className="product-modal-main-img-slider">
                  <Slider {...settings} ref={sliderRef}>
                    {productData?.images?.map((image: any, index: any) => (
                      <div
                        key={index}
                        className="product-modal-main-img-slider-img"
                        onClick={() => {
                          setMainImage(index)
                          if (index - 2 > currentIndex) {
                            sliderRef?.current?.slickNext()
                          } else if (index <= currentIndex)
                            sliderRef?.current?.slickPrev()
                        }}
                      >
                        <ProductSkeletonImage
                          src={image?.image}
                          layout={'fill'}
                          objectFit={'cover'}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="product-modal-main-img-main">
                  <ProductSkeletonImage
                    src={productData?.images?.[mainImage]?.image}
                    alt=""
                    objectFit={'cover'}
                    layout="fill"
                  />
                </div>

              </div>
              <div className="product-modal-main-text">
                <h1>
                  {productData?.title} ({productData?.color})
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
                <div className="product-modal-main-table" onClick={showModal}>
                  Таблица размеров
                </div>
                <div className="product-modal-main-text-buttons">
                  {selectedSize?.quantity <= 0 || !selectedSize || productData?.sizes?.length === 0
                    ?
                    <CustomButton
                      onClick={() => {
                        console.log(selectedSize)
                        onChangeIsOpenLeaveMessageSize(selectedSize?.size)
                        onChangeIsOpenLeaveMessage(productData?.article)
                      }}
                      title={'Сообщить о поступлении'}
                      padding={'24px 0'}
                      maxWidth={359}
                      backColor={'rgba(34, 34, 34, 1)'}
                      color={'rgba(255, 255, 255, 1)'}
                    />
                    :
                    <CustomButton
                      disable={selectedSize?.quantity <= 0 || !selectedSize || productData?.sizes?.length === 0}

                      onClick={handleAddToBucket}
                      title={'Добавить в корзину'}
                      padding={'24px 0'}
                      maxWidth={359}
                      backColor={'rgba(34, 34, 34, 1)'}
                      color={'rgba(255, 255, 255, 1)'}
                    />

                  }
                  <div className="product-modal-main-text-buttons-favorite"
                       onClick={addToFavorite}>
                    {
                      isFavorite
                        ?
                        <FavoriteIconFill/>
                        : <FavoriteIcon/>
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
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{top: 0}}
        width="100%"
        bodyStyle={{padding: 0}}
        centered={true}
        closable={false}
      >
        <div>
          <div className="title-size-table">
            <h1>
              Таблица размеров
            </h1>
            <h2>
              КАК ВЫБРАТЬ ОДЕЖДУ СВОЕГО РАЗМЕРА
            </h2>
          </div>

          <div className="sizes-inside">
            <table>
              <thead>
              <tr>
                <th>ЕВРОПЕЙСКИЙ РАЗМЕР</th>
                <th>РОССИЙСКИЙ РАЗМЕР</th>
                <th>ОБХВАТ ГРУДИ</th>
                <th>ОБХВАТ ТАЛИИ</th>
                <th>ОБХВАТ БЕДЕР</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>XS</td>
                <td>42</td>
                <td>82-85</td>
                <td>60-63</td>
                <td>90-93</td>
              </tr>
              <tr>
                <td>S</td>
                <td>44</td>
                <td>86-89</td>
                <td>64-67</td>
                <td>94-97</td>
              </tr>
              <tr>
                <td>M</td>
                <td>46</td>
                <td>90-93</td>
                <td>68-71</td>
                <td>98-101</td>
              </tr>
              <tr>
                <td>L</td>
                <td>48</td>
                <td>94-97</td>
                <td>72-75</td>
                <td>102-105</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>50</td>
                <td>98-101</td>
                <td>76-80</td>
                <td>106-109</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export default ProductModal;
