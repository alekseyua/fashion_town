import React from 'react';
import { womanSizes } from '../../images'
import Text from '../../components/Text';
import style from './styles/index.module.scss';

const ImageWoman = ({}) => {
  return (
    <div className={style['information-howto__sex']}>
      <h3 className={style['information-howto__heading']}>
        <Text text={'womans'} />
      </h3>
      <img src={womanSizes} className={style['information-howto__image']} />
    </div>
  );
};

export default React.memo(ImageWoman);
