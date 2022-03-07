import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GxIcon, GxRating } from '@garpix/garpix-web-components-react';
import { shareIcon, favoriteIcon, favoriteFilledIcon, faceBook } from '../../../images';
import { fbIcon, igIcon, vkIcon, waIcon, vIcon, telIcon } from '../../../images';
import Button from '../../Button';
import Sharing from '../../../components/Sharing';
import style from '../styles/index.module.scss';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';


const RatingProduct = ({
  reviews_statistic = { all_count: 0, all_count_percent: 0, max_stars_count: 0, stars_count: 0 },
  addWishlistProduct,
  site_configuration,
  productId,
  profileId,
  is_liked,
  title,
  shereRef,
  setStyleSocialItems,
  styleSocialItems,
  media,
}) => {
  
  const [favorite, setfavorite] = useState(is_liked);
  const history = useHistory();
  const { userPage } = useStoreon('userPage');
  const pathPageProduct =window.location.href;
  const textPageProduct = title;
  const imagePageProduct = title;
  const handleFavorite = () => {
    setfavorite(!favorite);
    addWishlistProduct(productId, profileId);
  };

  useEffect(() => {
    setfavorite(is_liked);
  }, [is_liked]);

  const social_links = [
    {
      icon: fbIcon,
      url: `https://www.facebook.com/sharer/sharer.php?u=`
      // url: site_configuration?.fb_link ? `http://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=[${pathPageProduct}]&p%5Bsummary%5D=[${textPageProduct}]&p%5Burl%5D=[${pathPageProduct}]&p%5Bimages%5D%5B0%5D=[${imagePageProduct}]" target="_blank"` : '#',
      // https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Ffacebook-login%2Fweb%2F&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=113869198637480
    },
    {
      icon: igIcon,
      url: `http://instagram.com/###?direct/inbox&text=`,
    },
    {
      icon: vkIcon,
      url: 'https://vk.com/share.php?url=',
    },
    {
      icon: waIcon,
      //https://api.whatsapp.com/send/?phone&text=%D0%92%D0%B0%D1%82%D1%81%D0%B0%D0%BF+%D0%91%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%3A+%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5+%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8+%D0%B4%D0%BB%D1%8F+%D0%BE%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B8+%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F+%D0%B1%D0%B5%D0%B7+%D1%81%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F+%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%D0%B0+%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0+%28%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%29+-+https%3A%2F%2Fnetolink.ru%2Fwhatsapp-link%2F&app_absent=0
      url: `https://api.whatsapp.com/send/?phone&text=`,
    },
    {
      icon: vIcon,
      url: `viber://forward?text=`,
    },
    {
      icon: telIcon,
      url:  'https://telegram.me/share/url?url=',
    },
  ];
    

  const henderClickSocial = () =>{
    setStyleSocialItems(!styleSocialItems)
    console.log(shereRef.current)

  };

// socialRef.current.baseURI
// window.open(social_links[0].url,'','toolbar=0,status=0,width=626,height=436')
//image_thumb

const henderShare = (social)=>{
  // window.open(`http://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=[${pathPageProduct}]`,'_blank','toolbar=0,status=0,width=626,height=436')
    // window.open(`${social}${pathPageProduct}&text=${textPageProduct}&%2F${media[0].image}`,"",'_blank','height=500','width=600')
     //вайбер
//
// console.log('social',social)
// console.log('${pathPageProduct}',`${pathPageProduct}`)

window.open(`${social}${pathPageProduct}`,"",'_blank','height=500','width=600')

}
  return (
    <div className={style['prodpage__rating']}>
      <div>
        
        <GxRating
          className={style['prodpage__rating-indicator']}
          precision="1"
          disabled
          value={reviews_statistic.all_count_percent}
        ></GxRating>
        <span className={style['prodpage__rating-counter']}>
          {`${reviews_statistic.all_count}`} отзыв(ов)
        </span>
      </div>
      <div className={style['prodpage__button_group']}>
     
        <Sharing title={title}>
          {({ callbackShareClick }) => {
            return (
              <div 
              ref={shereRef}
              className={ classNames({
                [style['social']]: !styleSocialItems,
                [style['social_opened']]: styleSocialItems,
              })}
              >
                <Button
                  onClick={()=>{
                    henderClickSocial();
                    // callbackShareClick();
                  }}
                  className={style['prodpage__button_group-btn']}
                >
                  <GxIcon src={shareIcon} />
                </Button>

                <div className={style["social-list"]}>
                  <div
                   className={style["social-link"]} 
                   onClick={()=>henderShare(social_links[0].url)} 
                  >
                    <img src={social_links[0].icon} className={style["social-link__fb"]} />
                  </div>
                  <div
                   className={style["social-link"]} 
                   onClick={()=>henderShare(social_links[1].url)} 
                  >
                    <img src={social_links[1].icon} className={style["social-link__ig"]} />
                  </div>
                  <div
                  className={style["social-link"]} 
                  onClick={()=>henderShare(social_links[2].url)} 
                  >
                    <img src={social_links[2].icon} className={style["social-link__vk"]} />
                  </div>

                  <div
                  className={style["social-link"]} 
                  onClick={()=>henderShare(social_links[3].url)} 
                  >
                    <img src={social_links[3].icon} className={style["social-link__wt"]} />
                  </div>
                  <div
                  className={style["social-link"]} 
                  onClick={()=>henderShare(social_links[4].url)} 
                  >
                    <img src={social_links[4].icon} className={style["social-link__vi"]} />
                  </div>
                  <div
                  className={style["social-link"]} 
                  onClick={()=>henderShare(social_links[5].url)} 
                  >
                    <img src={social_links[5].icon} className={style["social-link__tl"]} />
                  </div>

                </div>
              </div>
            );
          }}
        </Sharing>

        <Button onClick={handleFavorite} className={style['prodpage__button_group-btn']}>
          <GxIcon src={favorite ? favoriteFilledIcon : favoriteIcon} />
        </Button>
      </div>
    </div>
  );
};
export default React.memo(RatingProduct);
