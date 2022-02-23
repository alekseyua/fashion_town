import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import styles from './styles.module.scss'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const Navigation = ({itemIds=[]}) => (
  <motion.ul 
  className={styles["burger-ul"]}
  variants={variants}>
    {itemIds.map((itemsMenu,i) => (

      <MenuItem i={i} key={itemsMenu.id} itemsMenu={itemsMenu.title} url={itemsMenu.url} />
    ))}
  </motion.ul> 
);

// const itemIds = [0, 1, 2, 3, 4,5,6,7];

export default Navigation;
