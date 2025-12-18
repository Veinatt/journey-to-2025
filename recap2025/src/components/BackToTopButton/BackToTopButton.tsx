import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import styles from './BackToTopButton.module.scss';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className={`${styles.backToTop} ${styles.visible}`}
          aria-label="Back to top"
          onClick={handleClick}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: 'rgba(246, 179, 106, 0.2)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className={styles.icon} size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;