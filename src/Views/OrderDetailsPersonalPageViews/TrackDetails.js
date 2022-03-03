import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/index.module.scss';

const TrackDetails = ({ nubmerTrack = '80110156803221' }) => {
  const openLink = () =>{
    //let autoInput =
     //window.open("https://track24.ru/", 'отследить посылку' , 'min-width=100%,height=900')
    // autoInput.window.getElementById('inputTrackCode').value = nubmerTrack
  }
  return (
    <div className={style['cabinet_orders_details__track']}>
      Трек-номер для отслеживания:
      <span clsasName={style['cabinet_orders_details__number']}>{nubmerTrack}</span>
   
      <div clsasName={style['cabinet_orders_details__text-link']}>
          Check out
          {/* <Link 
            clsasName={style['cabinet_orders_details__link']}
            to={()=>openLink()}
            >
            the link
            <svg 
              clsasName={style['cabinet_orders_details__image']}
              viewBox="0 0 70 36"
            >
              <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
            </svg> 
          </Link>
          here*/}
        </div>
    </div>
  );
};

export default React.memo(TrackDetails);


