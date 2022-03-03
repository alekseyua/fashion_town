import React, { useEffect, useRef, useState } from 'react';
import style from './bottomHeaderMenu.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { v4 } from 'uuid';

const BottomHeaderMenu = ({ main_menu = [], isScrolled }) => {
  const [activeIndex, setActiveIndex] = useState();
  const clickOutMenuItemRef = useRef();


  // useEffect(() => {

  //   console.log(clickOutMenuItemRef.current)
  //   const clickOutMenu = (e) => clickOutMenuItemRef.current.contains(e.target) || console.log('out from block', e.target, clickOutMenuItemRef.current);
  //   document.addEventListener('click', clickOutMenu)
  //   return () => document.removeEventListener('click', clickOutMenu);

  // }, [])

  return (
    <div
      className={classNames({
        [style['bottom-header-menu']]: true,
        [style['scrolled']]: isScrolled,
      })}
    >
      <div className={style['container']}>
        <ul className={style['bottom-header-menu__list']}
          ref={clickOutMenuItemRef}

        >
          <AnimateSharedLayout>
            {main_menu.map((el, i) => (
              <MenuItems
                key={v4()}
                el={el}
                i={i}
                isSelected={activeIndex === i}
                handleClick={() => setActiveIndex(i)}
              />
            ))}
          </AnimateSharedLayout>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(BottomHeaderMenu);

const MenuItems = ({ el, isSelected, handleClick = Function.prototype, i, fucRef }) => {
  return (
    <li key={i} className={style['bottom-header-menu__li']}    >
      <Link
        key={i * v4()}
        to={el.url}>
        <motion.div

          key={v4()}
          style={{
            position: 'relative',
            fontWeight: 900,
          }}
          initial={{
            color: '#000',
            scale: 1,
          }}
          animate={{
            scale: isSelected ? 1.2 : 1,
            color: isSelected ? '#933468' : '#000',
          }}
          onClick={() => handleClick()}
        >
          {el.title}
          {isSelected && <ActiveLine />}
        </motion.div>
      </Link>
    </li>
  );
};

const ActiveLine = () => {
  return (
    <motion.div
      layoutId="activeItems"
      style={{
        width: '100%',
        height: '4px',
        position: 'absolute',
        bottom: '-6px',
        backgroundColor: 'rgb(147, 52, 104)',
      }}
    ></motion.div>
  );
};
