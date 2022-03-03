import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import useDimensions  from "./use-dimensions";
import Navigation  from "./Navigation";
import MenuToggle  from "./MenuToggle";
import styles from "./styles.module.scss";


const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const BurgerMenu = ({ itemIds}) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    return (
        <motion.nav
            className={styles["burger-nav"]}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div className={styles["burger-background"]} variants={sidebar}>
                <Navigation itemIds={itemIds} />
                <MenuToggle toggle={() => toggleOpen()} />
            </motion.div>
        </motion.nav>
    )
}

export default BurgerMenu;
