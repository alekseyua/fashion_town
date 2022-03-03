import React from 'react';
import { NavLink } from 'react-router-dom';
import { storeIcon } from '../../images';
import Text from '../../components/Text';
import style from './styles/userRouting.module.scss';

const StoreRoutingPanel = ({ cabinet_site_menu = [], shop }) => {
  const { is_has_shop, shop_id, shop_link, shop_logo, shop_title } = shop;
  return (
    <div className={style['cabinet-sidebarstore']}>
      <div className={style['cabinet-sidebar__top']}>
        <div className={style['cabinet-sidebar__avawrap']}>
          <img
            src={shop_logo ? shop_logo : storeIcon}
            alt="shop_logo"
            width={"50px"}
            height={"50px"}
            className={style['cabinet-sidebar__avaimg']}
          />
        </div>
        <div className={style['cabinet-sidebar__userinfo']}>
          <div className={style['cabinet-sidebar__username']}>{shop_title}</div>
          <div className={style['cabinet-sidebar__userrole']}>Интернет-магазин</div>
        </div>
      </div>
      <div className={style['cabinet-sidebar__menu']}>
        {cabinet_site_menu.map((el) => {
          return (
            <NavLink to={el.url ? el.url : '#'} key={el.id} className={'cabinet-sidebar__menulink'}>
              {el.title}
            </NavLink>
          );
        })}

        {/* <Link to="#" className="cabinet-sidebar__menulink">
          Заказы
          <span className="cabinet-sidebar__menucount">2</span>
        </Link> */}
      </div>
    </div>
  );
};

export default React.memo(StoreRoutingPanel);
