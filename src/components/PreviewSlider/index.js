import React, { useState, useRef, useEffect } from 'react';
import SliderViews from '../../Views/SliderViews';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Player, BigPlayButton } from 'video-react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import { v4 } from 'uuid';


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const FancyButton = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={className}>
    {props.children}
  </div>
));
  
const PreviewSlider = ({ 
  imageOrVideoSet = [],
  defaultImage,
  product_sku=[],
  colorsn,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [controlledTwoSwiper, setControlledTwoSwiper] = useState(null);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  
  return (
    <SliderViews.Wrapper>
      <SliderViews.FirstSliderWrapper>
        <FancyButton className={'swiper-button-prev'} ref={navigationPrevRef}></FancyButton>
        <Swiper
          id="main"
          thumbs={{ swiper: thumbsSwiper }}
          controller={{ control: controlledSwiper }}
          onSwiper={setControlledTwoSwiper}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          resizeObserver
          resistance
          observer
          observeSlideChildren
          direction={'vertical'}
          spaceBetween={10}
          slidesPerView={1}
          freeMode={false}
          longSwipesRatio={0.1}
          size={100}
          className={'swipper_container-vertical'}
        >
          {!imageOrVideoSet.length && defaultImage ? (
            <SwiperSlide key={v4()}>
              <SliderViews.Slide image={defaultImage}></SliderViews.Slide>
            </SwiperSlide>
          ) : null}
          {imageOrVideoSet.map((el, i) => {
            return (
              <SwiperSlide key={v4()}>
                <SliderViews.Slide
                
                  image={
                    imageOrVideoSet[0]?.color?
                    el.image
                    :el.type === 'video' ? el.preview : el.image}
                  //image={'http://91.218.229.240:8000' + el.image_thumb}

                ></SliderViews.Slide>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <FancyButton className={'swiper-button-next'} ref={navigationNextRef}></FancyButton>
      </SliderViews.FirstSliderWrapper>
      <SliderViews.LastSliderWrapper>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          id="controller"
          onSwiper={setControlledSwiper}
          thumbs={{ swiper: thumbsSwiper }}
          controller={{ control: controlledTwoSwiper }}
          watchSlidesVisibility
          resistance
          observer
          resizeObserver
          observeSlideChildren
        >
          {!imageOrVideoSet.length && defaultImage ? (
            <SwiperSlide key={v4()}>
              <SliderViews.Slide image={defaultImage}></SliderViews.Slide>
            </SwiperSlide>
          ) : null}
          {imageOrVideoSet.map((el, i) => {
            if (el.type === 'video') {
              return (
                <SwiperSlide key={v4()}>
                  <Player
                    className="news-details-page__slider_item"
                    fluid={true}
                    poster={el.preview}
                    src={el.video}
                  >
                    <BigPlayButton position="center"></BigPlayButton>
                  </Player>
                </SwiperSlide>
              );
            } else {
              return (
                <SwiperSlide key={v4()}>
                  <SliderViews.Slide image={
                    imageOrVideoSet[0]?.color ?
                      el.image
                      :el.image                    
                    }></SliderViews.Slide>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </SliderViews.LastSliderWrapper>
    </SliderViews.Wrapper>
  );
};

export default React.memo(PreviewSlider);
