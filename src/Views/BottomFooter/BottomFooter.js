import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './bottomFooter.module.scss';
import SocialLinks from '../SocialLinks';
import PaymentMethods from '../PaymentMethods';
import { fbIcon, igIcon, vkIcon, waIcon, vIcon, fbmIcon } from '../../images';
import { visaIcon, masterCardIcon, applePayIcon, mirIcon } from '../../images';

const BottomFooter = ({ site_configuration, year, policy }) => {
  // const {social_links, payment_methods} = props;
  const social_links = [
    {
      icon: fbIcon,
      url: site_configuration?.fb_link ? site_configuration.fb_link : '#',
    },
    {
      icon: igIcon,
      url: site_configuration?.insta_link ? site_configuration.insta_link : '#',
    },
    {
      icon: vkIcon,
      url: site_configuration?.vk_link ? site_configuration.vk_link : '#',
    },
    {
      icon: waIcon,
      url: site_configuration?.whatsapp_link ? site_configuration.whatsapp_link : '#',
    },
    {
      icon: vIcon,
      url: site_configuration?.viber_link ? site_configuration.viber_link : '#',
    },
    {
      icon: fbmIcon,
      url: site_configuration?.twitter_link ? site_configuration.twitter_link : '#',
    },
  ];
  const payment_methods = [
    {
      icon: visaIcon,
    },
    {
      icon: masterCardIcon,
    },
    {
      icon: applePayIcon,
    },
    {
      icon: mirIcon,
    },
  ];

  return (
    <div className={style['bottom-footer']}>
      <div className={'container'}>
        <div className={style['bottom-footer-wrap']}>
          <div className={style['bottom-footer__info']}>
            <span className={style['bottom-footer__copyright']}>&copy; {year} FASHIONTOWN </span>
            <Link 
            target="_blank" 
            to={policy ? policy : "#"} 
            className={style['bottom-footer__offer']}
            >
              Публичная оферта
            </Link>
          </div>
          <SocialLinks social_links={social_links} />
          <PaymentMethods payment_methods={payment_methods} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomFooter);
