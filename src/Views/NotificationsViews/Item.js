import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import CheckBox from '../../Views/CheckBox';
import style from './styles/index.module.scss';

const Item = ({
  isRead,
  date = '16 дек, 14:15',
  message = 'Проверка соблюдения условий',
  checkEnable,
  setAllCheckEnableChange,
  allCheckEnableChange,
  el,
}) => {
  const { id } = el;
  const [select, setSelect] = useState()
  useEffect(() => {
    setSelect(checkEnable)
  }, [checkEnable])

  //добавляем элемент в массив при select=true
  const getArrayNotificationAdd = (items, inputvalue) => {
    let res = []
    if (inputvalue) items.push(inputvalue)
    return res = items.reduce((acc, item) => {
      if (acc.indexOf(item) !== -1) return acc
      acc.push(item)
      return acc
    }, [])
  }
    // удаление из массива элемента при select=false
    const getArrayNotificationDel = (items, inputvalue) => {
      let res = [];
     return res = items.reduce((acc, item) => {
        if (inputvalue === item) return acc
        acc.push(item)
        return acc
      }, [])
    }

    return (
      <div className={style['cabinet_notifications__item']}>
        <div className={style['cabinet_notifications__item_wrapper']}>
          <CheckBox
            atr={id}
            onGx-change={(e) => {
              const value = e.target.atr;
              if (!select) {
                setAllCheckEnableChange(getArrayNotificationAdd(allCheckEnableChange, value))
                setSelect(!select)
              } else {
                setAllCheckEnableChange(getArrayNotificationDel(allCheckEnableChange, value))
                setSelect(!select)
              }

            }
            }
            variant="input"
            checked={select}
          />
          <span
            className={classNames({
              [style['cabinet_notifications__item_mark']]: true,
              [style['cabinet_notifications__item_mark-unread']]: !isRead,
            })}
          ></span>
          {/* <span
            
          >
            {message}
          </span> */}
          <div dangerouslySetInnerHTML={{ __html: message }}></div>

        </div>
        <span className={style['cabinet_notifications__item_date']}>{date}</span>
      </div>
    );
  };

 export default React.memo(Item);
