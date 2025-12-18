import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../types';
import EventMedia from '../EventMedia/EventMedia';
import styles from './EventSection.module.scss';

interface EventSectionProps {
  event: Event;
  index: number;
}

const EventSection: React.FC<EventSectionProps> = ({ event}) => {
  return (
    <motion.section
      className={styles.eventSection}
      id={`event-${event.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ 
        duration: 0.6, 
        delay: 0.1,
        type: "spring",
        stiffness: 50 
      }}
    >
      <div className={styles.header}>
        <div className={styles.date}>{event.date}</div>
        <h2 className={styles.title}>{event.title}</h2>
        <div className={styles.description}>{event.description}</div>
      </div>
      
      <div className={styles.mediaContainer}>
        <EventMedia images={event.images} />
      </div>
    </motion.section>
  );
};

export default EventSection;