"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../../lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto backdrop-blur-md border border-white/40 dark:border-white/20 rounded-full bg-white/70 dark:bg-black/70 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)] z-[5000] pr-4 pl-4 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <div className="flex items-center gap-2 backdrop-blur-md">
          {navItems.map((navItem, idx) => (
            <motion.div
              key={`nav-motion-${idx}`}
              onHoverStart={() => setActiveIndex(idx)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              {navItem.onClick ? (
                <button
                  key={`nav-item-${idx}`}
                  onClick={navItem.onClick}
                  className={cn(
                    "relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200",
                    activeIndex === idx 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  )}
                >
                  <span className="text-lg">{navItem.icon}</span>
                  <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </button>
              ) : (
                <Link
                  key={`nav-item-${idx}`}
                  to={navItem.link}
                  className={cn(
                    "relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200",
                    activeIndex === idx 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  )}
                >
                  <span className="text-lg">{navItem.icon}</span>
                  <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;