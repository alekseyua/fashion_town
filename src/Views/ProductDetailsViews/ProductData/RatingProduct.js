import React, { useState, useEffect } from 'react';
import { GxIcon, GxRating } from '@garpix/garpix-web-components-react';
import { shareIcon, favoriteIcon, favoriteFilledIcon } from '../../../images';
import Button from '../../Button';
import Sharing from '../../../components/Sharing';
import style from '../styles/index.module.scss';

const RatingProduct = ({
  reviews_statistic = { all_count: 0, all_count_percent: 0, max_stars_count: 0, stars_count: 0 },
  addWishlistProduct,
  productId,
  profileId,
  is_liked,
  title,
}) => {
  const [favorite, setfavorite] = useState(is_liked);
  const handleFavorite = () => {
    setfavorite(!favorite);
    addWishlistProduct(productId, profileId);
  };

  useEffect(() => {
    setfavorite(is_liked);
  }, [is_liked]);

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
              <Button onClick={callbackShareClick} className={style['prodpage__button_group-btn']}>
                <GxIcon src={shareIcon} />
              </Button>
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
