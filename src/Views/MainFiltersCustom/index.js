import React, { useState, useEffect } from 'react';
import style from '../MainFilters/mainFilters.module.scss';
import Button from '../Button';
import classNames from 'classnames';
import api from '../../api';


const MainFiltersCustom = ({ filters = [], selectItem, seletedItem, setStatusSeletedItem }) => {
  const apiOrder = api.orderApi;

  const [filtersState, setfilters] = useState(filters);

  let newA = filtersState.map(item=>{
  //   if(
  //     item.items.filter((el,i)=>{
  //     el.filter(elem=>{
  //       if (elem.redeemed === true){
  //       return elem
  //       }
  //     })
  //   })
  //   ){
  //     return item
  //   }

   })
  const setFilters = (id) => {
    setfilters(
      filtersState.map((el) => {
        return {
          ...el,
          active: el.id === id,
        };
      }),
    );

  // делаем чтобы сбор который полностью собраные не показывался
   

    // const fd = {
    //     id : id,
    //     active: true
    // }
    // apiOrder
    //   .createFakeEmptyCollection(fd)
    //   .then((res) => {
    //     productRequiredData.collections.push(res.data)',res);
    //     //setStateActiveBtn(true)//делаем активной кнопку
    //   });
  };

  useEffect(() => {
    const newFiltersList = filters.map((el) => {
      // debugger;
      if (seletedItem) {
        if (seletedItem.id === el.id) {
          return {
            ...el,
            active: true,
          };
        }
      }
        if( filters.length === 1 ){
          return {
            ...el,
            active: true,  
          }
        }else{
          return {
            ...el,
            active: false,
          }
      };
    });
    setfilters(newFiltersList);
  }, [filters]);




  return (
    <div
      className={classNames({
        [style['main-filters']]: true,
      })}
    >
      <div className={'container'}>
        <div className={style['main-filters-wrap']}>
          <ul className={style['main-filters__list']}>
            {filtersState.map((el, key) => {
              
              // el.active?setStatusSeletedItem({
              //   element : true,
              //   activeElementData : el
              // }):null;
              
              return (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters(el.id);
                    selectItem(el);
                  }}
                  key={el.id}
                  variant={el.active ? 'tab_active' : 'tab'}
                >
                  {el.title}
                </Button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainFiltersCustom);
