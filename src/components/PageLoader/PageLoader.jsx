import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./PageLoader.css";

const PageLoader = ({ isVisible = true }) => {
  const bars = [0, 1, 2];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="page-loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="loader-bars"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {bars.map((bar) => (
              <motion.div
                key={bar}
                className="loader-bar"
                animate={{ scaleY: [0.5, 1, 0.5] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 0.8,
                  delay: bar * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
