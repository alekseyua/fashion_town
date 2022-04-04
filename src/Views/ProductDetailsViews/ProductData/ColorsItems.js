import React, { useEffect, useState } from 'react';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import { color } from '../../../images';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const defaultItem = [1, 2, 3, 4, 5, 6];
const ColorsItems = ({ items = [], setColorsn, colorsn, getColorForMedia }) => {
  const [gropsColors, setGropsColors] = useState([])
  const [clickDelay, setClickDelay] = useState(null)

  useEffect(() => {
    let params = []
    params = colorsn.id? items.map(el=>el.id === colorsn.id?{...el, ...colorsn} : {...el, selected : false}) : items
    setGropsColors(params)
    setClickDelay('')
    const delayClk = setTimeout(() => {
      setClickDelay(null)
    }, 1000);
    return () => clearTimeout(delayClk)
  }, [items.length, colorsn.id])

  

  return (
    <div className={style['prodpage-colors']}>
      <p className={style['prodpage-colors__name']}>
        <>
          <span>
            <Text text="color" />: &nbsp;
          </span>
          {colorsn.id ? colorsn.title : 'Выберите цвет'}
        </>
      </p>
      <ul className={style['prodpage-colors__items']}>
        {items.length === 0
          ? defaultItem.map((el, i) => {
            return (
              <li key={i} className={style['prodpage-colors__item']}>
                <GxButton
                  disabled={'disabled'}                 
                  // disabled={clickDelay}
                 key={el.id}
                  className={classNames({
                    [style['prodpage-colors__btn']]: true,
                    sceleton: true,
                  })}
                  variant="text"
                  style={{ backgroundColor: 'gray', borderRadius: '1px' }}
                ></GxButton>
              </li>
            );
          })
          : null}
        {gropsColors.map((el) => {
          // colorsn?setColorsn(el):null
          return (
            <li
              key={el.id}
              className={style['prodpage-colors__item']}
            >
              <GxButton
                disabled={clickDelay}
                key={el.id}
                className={classNames({
                  [style['prodpage-colors__btn']]: true,
                  [style['active']]: (colorsn && colorsn.id === el.id) || el.selected,
                })}
                onClick={() => {
                  getColorForMedia(el.id)
                  setColorsn({...el, selected : true})
              }}
                variant="text"
                style={{ backgroundColor: el.color, borderRadius: '1px' }}
              ></GxButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default React.memo(ColorsItems);
