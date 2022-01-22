import React from 'react';
import style from './styles/index.module.scss';
import { newsCard } from '../../images';

const LivePhotosDetailsCard = (props) => {
  let { brand, image = '#', imageSet, videoSet, onClickCard } = props;

  return (
    <div
      className={style['live_photos__card']}
      onClick={() => {
        onClickCard({ brand, image, imageSet, videoSet });
      }}
    >
      <img
        src={image ? image : newsCard}
        alt={brand}
        className={style['live_photos__image']}
        alt="Live photo image"
      />
    </div>
  );
};

export default React.memo(LivePhotosDetailsCard);
