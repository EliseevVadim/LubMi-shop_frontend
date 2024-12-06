import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import CustomButton from "../../components/client/common/CustomButton";
import Slider from 'react-slick';
import homeIntroOne from '../../../public/home-intro-1.jpg'
import homeIntroOneMob from '../../../public/home-intro-1-mob.jpg'
import homeIntroTwo from '../../../public/home-intro-2.png'
import homeIntroTwoMob from '../../../public/home-intro-2-mob.jpg'
import Image from "next/dist/client/legacy/image";
import Catalog from "../../components/client/catalog/Catalog";
import MaxWithLayout from "../../layouts/MaxWithLayout";
import { api } from "@/api/ApiWithoutToken";
import { Spin } from "antd";
import { useRouter } from "next/router";

const MainContent: FC = () => {

  const router = useRouter()

  const slides = [
    {
      id: 1,
      image: homeIntroOne,
      imageMob: homeIntroOneMob,
      text: 'новая коллекция',
      buttonText: 'Перейти в каталог',
      link: '/catalog',
      style: {}
    },
    {
      id: 2,
      image: homeIntroTwo,
      imageMob: homeIntroTwoMob,
      text: 'коллекция ароматов',
      buttonText: 'Ознакомиться',
      link: '/perfumery',
      style: {
        maxWidth: 760,
        marginBottom: 50,
      }
    },
  ]

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

  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<any>(true)
  const [page, setPage] = useState<any>(1)
  const [limit, setLimit] = useState<number>(10)
  const [sort, setSort] = useState<any>('novelties-first')
  const [totalCount, setTotalCount] = useState<any>(0)

  const [data1, setData1] = useState<any>([])
  const [isLoading1, setIsLoading1] = useState<any>(true)
  const [page1, setPage1] = useState<any>(1)
  const [limit1, setLimit1] = useState<any>(10)
  const [sort1, setSort1] = useState<any>('novelties-first')
  const [totalCount1, setTotalCount1] = useState<any>(0)

  useEffect(() => {
    setIsLoading(true)
    api.get(`/products/${sort}/${limit}/${page}/`)
      .then((response) => {
        setData(response?.data?.data)
        setTotalCount(response?.data?.['total-count'])
      })
      .catch(() => {

      })
      .finally(() => {
        setIsLoading(false)
      });
  }, [limit, sort])

  useEffect(() => {
    setIsLoading1(true)
    api.get(`/products/bestsellers/${limit1}/${page1}/`)
      .then((response) => {
        setData1(response?.data?.data)
        setTotalCount1(response?.data?.['total-count'])
      })
      .catch(() => {

      })
      .finally(() => {
        setIsLoading1(false)
      });
  }, [limit1, sort1])

  return (
    <div className="home">
      <div className="home-slider">
        <Slider {...settings} >
          {
            slides?.map((item: any, index: any) =>
              <div className="home-slider-item">
                <div className="home-slider-item-img-desc">
                  <Image
                      layout={'fill'}
                      objectFit={'cover'}
                      src={item?.image}
                  />
                </div>
                <div className="home-slider-item-img-mob">
                  <Image
                      layout={'fill'}
                      objectFit={'cover'}
                      src={item?.imageMob}
                  />
                </div>
                <div className="home-slider-item-inner">
                  <h2 style={item.style}>
                    {item.text}
                  </h2>
                  <CustomButton
                    onClick={() => router.push(item?.link)}
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
        <Spin spinning={isLoading}>
          <Catalog
            limit={limit}
            products={data}
            replaceUrl={false}
            totalCount={totalCount}
            setSort={(limit) =>{
              setLimit(limit)
            }}
          />
        </Spin>
      </div>

      <div className="home-catalog">
        <Spin spinning={isLoading1}>
          <Catalog
            limit={limit1}
            title={'Бестселлеры'}
            products={data1}
            replaceUrl={false}
            totalCount={totalCount1}
            setSort={(limit) =>{
              setLimit1(limit)
            }}
            isWithSort={false}
          />
        </Spin>
      </div>

      <div className="home-banner">
        <MaxWithLayout>
          <div className="home-banner-inner">
            <h2>
              Парфюмерия
            </h2>
            <CustomButton
              onClick={() => router.push('/perfumery')}
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
