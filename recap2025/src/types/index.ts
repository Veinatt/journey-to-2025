export interface HeroImage {
  url: string;
}

export interface EventImage {
  url: string;
}

export interface Event {
  id: number;
  date: string;
  title: string;
  description: string;
  images: EventImage[];
}

export interface SwiperInstance {
  destroy: () => void;
  update: () => void;
}