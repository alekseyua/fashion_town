import React, {useState, useEffect} from 'react';
import { GxMenu, GxMenuItem, GxBadge } from '@garpix/garpix-web-components-react';
import style from './menu.module.scss';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
// import Icon from '../../#lifehack/Icomoon/Icon';


const Menu = ({ cabinet_menu = [] }) => {
  
  const [ notif, setNotif ] = useState(0);
  const {userPage} = useStoreon('userPage');
  useEffect(()=>{
    setNotif(userPage.notifications)
  },[userPage.notifications])

  return (
    <div className={style['wrapper']}>
      <GxMenu className={style['wrapper-menu']}>
        {cabinet_menu.map((el) => {
          return (
            <GxMenuItem key={el.id}>
              {/* //добавляем блок с увидомлением о письмах 
               && notif>0
              */}
              
              {( el.id === 30 ) ? (
                userPage.notifications?(
                <>
                <div className={style['inner-notif']}>
                  <Link className={style['test']} data-cy={`menu-${el.title}`} to={el.url}>{el.title}</Link>
                  <div className={style['notif']}>
                    {/* <Icon icon="drawer" size={20} color="orange" className={style["icomoon"]} /> */}
                    {userPage.notifications}
                  </div>
                </div>
                </>)
                :null
              ): (<Link className={style['test']} data-cy={`menu-${el.title}`} to={el.url}>{el.title}</Link>
              )}
              
              
              {el.notifi ? (
                <GxBadge pill className={style['wrapper-menu-bage']} slot={'suffix'}>
                  {el.notifi}
                </GxBadge>
              ) : null}
              
              
            </GxMenuItem>
          );
        })}
      </GxMenu>
    </div>
  );
};
export default React.memo(Menu);
