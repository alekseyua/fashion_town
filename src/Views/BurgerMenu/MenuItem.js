import * as React from "react";
import { motion } from "framer-motion";
import styles from './styles.module.scss'
import { NavLink } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF", "#3300FF", "#2200FF","#1100FF"];

const MenuItem = ({ i,itemsMenu, url }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <NavLink
      key={`nav${i}`}
      to={url}
    >
    <motion.li
    className={styles["burger-li"]}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      
      <div className={styles["burger-icon-placeholder"]} style={style} ></div>
      <div className={styles["burger-text-placeholder"]} style={style}> {itemsMenu}</div>
    </motion.li>
    </NavLink>
  );
};

export default MenuItem;