import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper.scss';

const Slider = ({ images = [1, 2, 3], activeIndex = 1, children }) => {
  const swiperRef = useRef(null);
  //todo: добавить данные из контекста убрать хардкод
  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      spaceBetween: 10,
      observer: true,
      slidesPerView: 6,
      direction: 'horizontal',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
  }, []);

  return (
    <div ref={swiperRef}>
      <div className="swiper-wrapper">{children}</div>
    </div>
  );
};

export default React.memo(Slider);
