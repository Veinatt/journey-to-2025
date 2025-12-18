import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSwiper from './components/HeroSwiper/HeroSwiper';
import EventSection from './components/EventSection/EventSection';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';
import Footer from './components/Footer/Footer';
import { heroImages, eventsData } from './data/constants';
import { shuffleArray } from './utils/helpers';
import './styles/main.scss';

const App: React.FC = () => {
  // Генерируем перемешанные изображения один раз при монтировании
  const shuffledImages = useMemo(() => shuffleArray(heroImages), []);

  useEffect(() => {
    // Предзагрузка героических изображений
    shuffledImages.forEach(({ url }) => {
      const img = new Image();
      img.src = url;
    });

    // Предзагрузка изображений событий
    eventsData.forEach((event) => {
      event.images.forEach(({ url }) => {
        const img = new Image();
        img.src = url;
      });
    });
  }, [shuffledImages]); // Добавили shuffledImages в зависимости

  return (
    <>
      <BackToTopButton />
      <main className="year-review" id="top">
        <motion.section 
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="hero__content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="hero-title">Итоги 2025 года</h1>
            <p className="hero-subtitle">
              Посмотри, каким прекрасным был твой год!
            </p>
          </motion.div>

          <HeroSwiper images={shuffledImages} />

          <motion.div 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              Прокрути вниз, чтобы увидеть особенные моменты прошедшего года,
              какими в них я видел тебя)
            </p>
            <div className="scroll-indicator" aria-hidden="true">
              <span className="scroll-indicator__dot" />
            </div>
          </motion.div>
        </motion.section>

        <section className="events" aria-label="Year events">
          <div className="events__list">
            {eventsData.map((event, index) => (
              <EventSection key={event.id} event={event} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default App;