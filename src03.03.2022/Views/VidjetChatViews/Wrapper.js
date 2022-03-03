import { motion } from 'framer-motion';
import React from 'react';
import style from './styles/index.module.scss';

const Wrapper = ({ children }) => {
  return (
    <motion.div 
      initial={{
        opacity: 0,
        height: 0
      }}
      animate={{
        opacity: 1,
        height: '100%'
      }}
      transition={{
        duration: 1
      }}
      exit={{
        height: 0,
        opacity: 0
      }}
    className={style['widget__wrap']}>
      {' '}
      <div className={style['widget__chat']}>{children}</div>
    </motion.div>
  );
};

export default React.memo(Wrapper);
