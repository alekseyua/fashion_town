import React from 'react';
import style from './livePhotos.module.scss';
import LivePhotosCard from '../LivePhotosCard';
import { livePhotosCard } from '../../images/index';
import MoreLink from '../MoreLink';
import Text from '../../components/Text';
import Title from '../Title'

const LivePhotosLayout = ({ live_photos, live_photos_url }) => {
  return (
    <div className={style['live-photos']}>
      <div className={'container'}>
        <div className={style['live-photos-wrap']}>
          <Title type={'h2'} variant={'live__photos-title'}>
            <Text text={'livePhotos'} />
          </Title>
          <span className={style['live-photos__subtitle']}>
            <Text text={'albums'} />
          </span>
          <div className={style['live-photos__list']}>
            {live_photos.map((el, i) => {
              return (
                <LivePhotosCard
                  key={el.id}
                  slug={el.url}
                  brand={el.brand}
                  date={el.created_at}
                  image={el.image ? el.image : livePhotosCard}
                />
              );
            })}
          </div>
          <MoreLink url={live_photos_url}>
            <Text text={'show_all'} />
          </MoreLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LivePhotosLayout);
