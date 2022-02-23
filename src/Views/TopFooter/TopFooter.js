import React, { useState, useEffect } from 'react';
import style from './topFooter.module.scss';
import FooterInfo from '../FooterInfo';
import FooterMenu from '../FooterMenu';
import { feedbackIcon, deliveryIcon } from '../../images/index';
import Text from '../../components/Text';
import { NavLink } from 'react-router-dom';
import style1 from '../FooterInfo/footerInfo.module.scss';
import Logo from '../Logo/Logo';
import classNames from 'classnames';

const TopFooter = ({
  footer_menu = [],
  site_configuration,
  role_configuration,
  openModalFeedback,
  classModificator = false,
}) => {
  //todo: можно пропсом кастрировать футер

  const openVidjet = () => {
    // dispatch('faq/update', {
    //   show: true,
    // });
  };

  const initialState = {
    menu: [],
    main_info_title: '',
    main_info: null,
    delivery_info: null,
    main_link: {
      name: Text({ text: 'feedback' }),
      icon: feedbackIcon,
    },
    delivery_link: {
      name: Text({ text: 'deliveryOptions' }),
      icon: deliveryIcon,
      url: '/',
    },
  };
  const [state, setstate] = useState(initialState);
  useEffect(() => {
    let newState = {};
    newState.delivery_info = (
      <div dangerouslySetInnerHTML={{ __html: role_configuration.delivery_condition }}></div>
    );
    newState.main_info = (
      <div dangerouslySetInnerHTML={{ __html: site_configuration.contacts }}></div>
    );
    newState.menu = footer_menu.map((el) => {
      return {
        footer_menu_title: el.title,
        footer_menu: el.children.map((children) => {
          return {
            name: children.title,
            url: children.url,
          };
        }),
      };
    });
    setstate({
      ...initialState,
      ...newState,
    });
  }, []);
  const customClassNameWrapper = classNames({
    [style1['footer-info']]: true,
    [style1[classModificator]]: !!classModificator,
  });
  return (
    <div className={style['top-footer']}>
      <div className={'container'}>
        <div className={style['top-footer-wrap']}>
          {/*           
          <FooterInfo
            site_configuration={site_configuration}
            content={state.main_info}
            logo={true}
            data={state.main_link}
            callbackOnClick={openModalFeedback}
          /> */}
          <div className={style['top-footer__inner']}>
          <div className={style['top-footer__left']}>
            <div className={style1['footer-logo']}>
              <Logo site_configuration={site_configuration} />
            </div>

            <div className={style1['footer-info__content']}>{state.main_info}</div>

            <div className={style1['footer-info__link']} onClick={openModalFeedback}>
              <i className={style1['footer-info__link-img']}>
                <img src={state.main_link.icon} alt="footer icon" width={'10px'} height={'10px'} />
              </i>
              <span className={style1['footer-info__link-name']}>{state.main_link.name}</span>
            </div>
          </div>

          <div className={style['top-footer__center']}>
            {state.menu.map((el, i) => {
              return <FooterMenu key={i} menu={el.footer_menu} title={el.footer_menu_title} />;
            })}
          </div>

          {/* <FooterInfo
            classModificator={'right'}
            content={state.delivery_info}
            link={state.delivery_link}
            title={state.main_info_title}
          /> */}
          <div className={style['top-footer__right']}>
            <h4 className={style1['footer-info__title']}>ДОСТАВКА</h4>
            <div className={style['footer-info__content']}>{state.delivery_info}</div>
            <div className={style1['footer-info__link']} onClick={openModalFeedback}>
              <i className={style1['footer-info__link-img']}>
                  <img src={state.delivery_link.icon} alt="footer icon" width={'10px'} height={'10px'} />
              </i>
              <span className={style1['footer-info__link-name']}>{state.delivery_link.name}</span>
            </div>
          </div>
          </div> 
          <div className={style['top-footer__center--mob']}>
            {state.menu.map((el, i) => {
              return <FooterMenu key={i} menu={el.footer_menu} title={el.footer_menu_title} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopFooter);
