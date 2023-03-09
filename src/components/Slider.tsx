import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SinglePicture from './SinglePicture';
import { Image } from '../types';

export type SliderProps = {
  sliderImages: Image[];
};

const Slider = ({ sliderImages }: SliderProps) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        {sliderImages.map((sliderImage: Image) => (
          <SwiperSlide key={sliderImage.id}>
            <SinglePicture picture={sliderImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
