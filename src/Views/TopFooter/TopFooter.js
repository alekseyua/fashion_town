import React, { useState, useEffect } from 'react';
import style from './topFooter.module.scss';
import FooterInfo from '../FooterInfo';
import FooterMenu from '../FooterMenu';
import { feedbackIcon, deliveryIcon } from '../../images/index';
import Text from '../../components/Text';

const TopFooter = ({ footer_menu = [], site_configuration, role_configuration, openModalFeedback }) => {


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

  return (
    <div className={style['top-footer']}>
      <div className={'container'}>
        <div className={style['top-footer-wrap']}>
          <FooterInfo
            site_configuration={site_configuration}
            content={state.main_info}
            logo={true}
            data={state.main_link}
            callbackOnClick={openModalFeedback}
          />
          <div className={style['top-footer__center']}>
            {state.menu.map((el, i) => {
              return <FooterMenu key={i} menu={el.footer_menu} title={el.footer_menu_title} />;
            })}
          </div>
          <FooterInfo
            classModificator={'right'}
            content={state.delivery_info}
            link={state.delivery_link}
            title={state.main_info_title}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopFooter);
