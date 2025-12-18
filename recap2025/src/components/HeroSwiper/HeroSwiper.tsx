import React, { useState, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { HeroImage } from '../../types';
import CustomPagination from '../CustomPagination/CustomPagination';
import styles from './HeroSwiper.module.scss';

interface HeroSwiperProps {
  images: HeroImage[];
}

const HeroSwiper: React.FC<HeroSwiperProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 500); // Плавный переход
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Swiper
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        modules={[EffectCards]}
        cardsEffect={{
          slideShadows: false,
          perSlideOffset: 15,
          perSlideRotate: 2,
        }}
        className={`swiper ${styles.heroSwiper}`}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        breakpoints={{
          320: {
            cardsEffect: {
              perSlideOffset: 12,
              perSlideRotate: 1.5,
            },
          },
          768: {
            cardsEffect: {
              perSlideOffset: 18,
              perSlideRotate: 2.2,
            },
          },
          1024: {
            cardsEffect: {
              perSlideOffset: 22,
              perSlideRotate: 2.6,
            },
          },
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={`${item.url}-${index}`} className={styles.slide}>
            <article className={styles.card} aria-label={`Highlight ${index + 1}`}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.url}
                  alt={`2025 highlight ${index + 1}`}
                  loading="lazy"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.metaRow}>
                  <span className={styles.pill}>
                    2025 · {index + 1}/{images.length}
                  </span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <CustomPagination
        total={images.length}
        activeIndex={activeIndex}
        onBulletClick={handleBulletClick}
        variant="hero"
      />
    </motion.div>
  );
};

export default HeroSwiper;