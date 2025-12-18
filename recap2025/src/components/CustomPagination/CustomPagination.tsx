import React from 'react';
import styles from './CustomPagination.module.scss';

interface CustomPaginationProps {
  total: number;
  activeIndex: number;
  onBulletClick: (index: number) => void;
  variant?: 'default' | 'hero' | 'event';
  className?: string;
  maxVisible?: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  activeIndex,
  onBulletClick,
  variant = 'default',
  className = '',
  maxVisible = 5,
}) => {
  if (total <= 1) return null;

  // Вычисляем, какие bullet'ы показывать
  const getVisibleBullets = () => {
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const visibleBullets: number[] = [];
    const half = Math.floor(maxVisible / 2);
    
    // Всегда показываем активный bullet
    visibleBullets.push(activeIndex);
    
    // Добавляем bullet'ы слева от активного
    let leftCount = 0;
    for (let i = 1; i <= half; i++) {
      const leftIndex = activeIndex - i;
      if (leftIndex >= 0) {
        visibleBullets.unshift(leftIndex);
        leftCount++;
      }
    }
    
    // Добавляем bullet'ы справа от активного
    let rightCount = 0;
    for (let i = 1; i <= half; i++) {
      const rightIndex = activeIndex + i;
      if (rightIndex < total) {
        visibleBullets.push(rightIndex);
        rightCount++;
      }
    }
    
    // Если слева не хватило bullet'ов, добавляем дополнительные справа
    if (leftCount < half) {
      const additionalRight = half - leftCount;
      for (let i = 1; i <= additionalRight; i++) {
        const rightIndex = activeIndex + rightCount + i;
        if (rightIndex < total) {
          visibleBullets.push(rightIndex);
        }
      }
    }
    
    // Если справа не хватило bullet'ов, добавляем дополнительные слева
    if (rightCount < half) {
      const additionalLeft = half - rightCount;
      for (let i = 1; i <= additionalLeft; i++) {
        const leftIndex = activeIndex - leftCount - i;
        if (leftIndex >= 0) {
          visibleBullets.unshift(leftIndex);
        }
      }
    }
    
    return visibleBullets;
  };

  const visibleBullets = getVisibleBullets();

  // Определяем размер для каждого bullet'а в зависимости от расстояния до активного
  const getBulletSize = (index: number): 'large' | 'medium' | 'small' | 'extra-small' => {
    const distance = Math.abs(index - activeIndex);
    
    if (distance === 0) return 'large';    // Активный
    if (distance === 1) return 'medium';   // Соседние
    if (distance === 2) return 'small';    // Через один
    return 'extra-small';                  // Все остальные
  };

  return (
    <div className={`${styles.container} ${styles[variant]} ${className}`}>
      <div className={styles.pagination}>
        {visibleBullets.map((index) => {
          const size = getBulletSize(index);
          return (
            <button
              key={index}
              className={`${styles.bullet} ${styles[size]} ${
                index === activeIndex ? styles.active : ''
              }`}
              onClick={() => onBulletClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomPagination;