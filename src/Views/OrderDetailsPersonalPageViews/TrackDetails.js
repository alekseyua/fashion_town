import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/index.module.scss';
import { link } from '../../images';
import { GxIcon } from '@garpix/garpix-web-components-react';
const TrackDetails = ({ nubmerTrack = '80110156803221' }) => {
  const openLink = () =>{
    //let autoInput =
     window.open("https://track24.ru/", 'отследить посылку' , 'min-width=100%,height=900')
    // autoInput.window.getElementById('inputTrackCode').value = nubmerTrack
  }
  return (
    <div className={style['cabinet_orders_details__track']}>
     
      <span clsasName={style['cabinet_orders_details__number']}> Трек-номер для отслеживания:&nbsp;{nubmerTrack}</span>
      <div className={style["cabinet_orders_details__info"]}>отслеживать посылку необходимо на сайте CDEK или https://track24.ru/, а также на сайте почты Страны отправления</div>
      <div clsasName={style['cabinet_orders_details__text-link']}>
        <p style={
          {
          position : 'relative',
          fontSize : '16px',
          top : '0px',
          margin : 0,
            color: `#820c78`
        }    
        }>
          Отследить посылку &nbsp;
          <Link 
            to="#"
          onClick={openLink}
            style={
              {
                display: `inline - block`,
                position: `relative`,
                textDecoration: `none`,
                color: `inherit`,
                margin: 0,
                transition: `margin .15s`,
              }
            }
          >
              track24.ru
            <svg 
              viewBox="0 2 70 26"
            >
              <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
            </svg>
            &nbsp;
          </Link>
        </p>
      </div>
    </div>
  );        
};

export default React.memo(TrackDetails);


