import React from 'react';
import { NavLink } from 'react-router-dom';
import Title from '../Title';
import Text from '../../components/Text';
import style from './styles/index.module.scss';

const InfoSubContent = ({ title, image, content = null, reverse, url = '#' }) => {
  return (
    <div
      className={reverse ? [style['subcontent-reverse_wrapper']] : [style['subcontent-wrapper']]}
    >
      <div className={style['subcontent__image']}>
        <img src={image} className={style['subcontent__image-img']} />
      </div>
      <div className={style['subcontent__content']}>
        <Title variant={'sub_content'} type={'h3'}>
          {title}
        </Title>
        <div className={style['subcontent__content-text']}>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
        {url ? (
          <NavLink to={url} className={style['subcontent__content-link']}>
            <Text text={'registration'} />
          </NavLink>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(InfoSubContent);
