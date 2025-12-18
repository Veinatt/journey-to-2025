import React, { useState, useRef } from 'react';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { motion } from 'framer-motion';
import { EventImage } from '../../types';
import CustomPagination from '../CustomPagination/CustomPagination';
import styles from './EventMedia.module.scss';

interface EventMediaProps {
  images: EventImage[];
}

const EventMedia: React.FC<EventMediaProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 300);
    }
  };

  if (images.length === 1) {
    return (
      <motion.figure
        className={styles.singleImage}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <img src={images[0].url} alt="" loading="lazy" className={styles.image} />
      </motion.figure>
    );
  }

  return (
    <div className={styles.container}>
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        modules={[EffectFade]}
        className={`swiper ${styles.eventMediaSwiper}`}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={`${img.url}-${idx}`}>
            <motion.figure
              className={styles.slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={img.url} alt="" loading="lazy" className={styles.image} />
            </motion.figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <CustomPagination
        total={images.length}
        activeIndex={activeIndex}
        onBulletClick={handleBulletClick}
        variant="event"
        className={styles.eventPagination}
      />
    </div>
  );
};

export default EventMedia;