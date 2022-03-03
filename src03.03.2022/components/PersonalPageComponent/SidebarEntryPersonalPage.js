import React, {useEffect, useState} from 'react';
import { change } from '../../images';
import PersonalPageViews from '../../Views/PersonalPageViews';
import { Formik } from 'formik';
import api from '../../api';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

const SidebarPersonalPage = ({
  create_shop,
  is_has_shop,
  cabinet_menu,
  cabinet_site_menu,
  username,
  role,
  setModalStates,
  currentCurrcensies,
  shop,
}) => {
const { stateValuePoly, dispatch } = useStoreon('stateValuePoly');
  const history = useHistory();
const [valueIn, setValueIn] = useState(null);

const changeData = (event) => {
  event.preventDefault();
  // console.log("Сразу",stateValuePoly);
  // dispatch('stateValuePoly/change', {stateCart:true});
      // api
      //   .orderApi
      //   .postGetEcuaringLink({
      //     order_id: valueIn
      //   })
      //   .then(res=>{
      //     console.log("otvet payment", res)
      //     history.push('balance');
      // })
      //   .catch(err=>{
      //     console.log(`ERROR "SidebarPersonalPage" otvet payment ${err}`);
      //     // history.push('orders');
      //     console.log('history',history);
      //   })
  setValueIn(null)
}

const changeValue = (e) => {
  setValueIn(e.target.value)
}



  return (
    <PersonalPageViews.Container>
      <PersonalPageViews.UserRoutingPanel
        username={username}
        cabinet_menu={cabinet_menu}
        role={role}
        setModalStates={setModalStates}
      />
      {!is_has_shop ? (
        <PersonalPageViews.CreateStore
          className={'desktop'}
          role={role}
          create_shop={'motivacionnaya-strannica-im'}
        />
      ) : (
        <PersonalPageViews.StoreRoutingPanel shop={shop} cabinet_site_menu={cabinet_site_menu} />
      )}
      {/* <form onSubmit={changeData}>
        <label>Введите номер оплачиваемой квитанции</label>
        <div>
          <input 
            type="number"
            placeholder="пример ввода 536"
            onChange={changeValue}
            value={valueIn}
          />  
        </div>
        <div>
          <input 
            type="submit"
            value="Отправить запрос"
            name='inputdata'
          />
        </div>
        
      </form> */}
    </PersonalPageViews.Container>
  );
};

export default React.memo(SidebarPersonalPage);
