import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import styles from './Footer.module.scss';

interface ParticleStyle {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

// Генерируем частицы вне компонента или в useMemo
const generateParticles = (): ParticleStyle[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  }));
};

const Footer: React.FC = () => {
  // useMemo для генерации частиц один раз
  const particles = React.useMemo(() => generateParticles(), []);

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Sparkles className={styles.sparkle} size={32} />
          Ты умничка!
          <br />
          Дальше больше!
          <br />
          Встретимся в твоём 27 году!
          <Sparkles className={styles.sparkle} size={32} />
        </motion.div>
        
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p>С любовью и благодарностью за каждый момент ❤️</p>
          <div className={styles.year}>2025</div>
        </motion.div>
        
        <motion.div
          className={styles.particles}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={styles.particle}
              style={{
                left: particle.left,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;