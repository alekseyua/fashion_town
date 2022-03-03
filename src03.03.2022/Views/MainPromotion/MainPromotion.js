import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './mainPromotion.module.scss';
import { GxGrid, GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { closeIcon } from '../../images/index';
import { useStoreon } from 'storeon/react';
import { isTargetBlank, setLocalStorage, getLocalStorage } from '../../utils';
import { LOCAL_STORAGE_KEYS, ROLE } from '../../const';
import { motion } from 'framer-motion';
/**
 *
 * @param { background,content,target_blank,url } param0
 */
const MainPromotion = ({ announce, role }) => {
  const { dispatch, promotionsAdds } = useStoreon('promotionsAdds');
  const { content, isOpen = false } = promotionsAdds;
  const setDataPromotions = (e) => {
    setLocalStorage(LOCAL_STORAGE_KEYS.ANNOUNCE, announce.id);
    dispatch('promotionsAdds', {
      isOpen: false,
      content: content,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (announce) {
      const isOpenAnnounce =
        getLocalStorage(LOCAL_STORAGE_KEYS.ANNOUNCE) !== announce.id &&
        role !== ROLE.UNREGISTRED &&
        role !== ROLE.RETAIL;
      dispatch('promotionsAdds', {
        isOpen: isOpenAnnounce,
        content: announce.content,
      });
    } else {
      dispatch('promotionsAdds', {
        isOpen: false,
        content: null,
      });
    }
  }, []);

  if (role !== ROLE.WHOLESALE || role !== ROLE.DROPSHIPPER) return null;
  if (!isOpen) return null;

  let arrInitialData = new Array(5)
  .fill('')
  .map((_,i)=>{
    let index = 1;
    return index+i/10
  })
  return (
    <div className={style['main-promotion-wrapper']}>
      <div className={style['main-promotion-wrapper__bg']}></div>
      <GxGrid fixed={true}>
        <ul className={style['main-promotion__list']}>
          <li className={style['main-promotion__list-item']}>
            <motion.NavLink
              animate={{
                x : [ -1600, 1600],
                scale: arrInitialData,
                y:-5
              }}
              transition={{
                duration : 50,
                repeat : Infinity
                // ease: "easeOut"
              }}
              target={isTargetBlank(announce?.target_blank)}
              to={announce?.url ? announce?.url : '#'}
            >
              <div dangerouslySetInnerHTML={{ __html: announce?.content }}></div>
            </motion.NavLink>
          </li>
        </ul>
      </GxGrid>
      <GxButton
        onClick={setDataPromotions}
        size={'sm'}
        variant="text"
        className={style['main-promotion__close']}
      >
        <GxIcon src={closeIcon} />
      </GxButton>
    </div>
  );
};

export default React.memo(MainPromotion);
