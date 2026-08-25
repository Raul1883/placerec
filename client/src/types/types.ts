export interface Service {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface ItemsProps {
  service: Service;
  toggleService: (id: string) => void;
  expandedId: string | null;
}

export interface PortfolioItem {
  id: string;
  artist: string;
  trackTitle: string;
  service: string;
  videoUrl: string;
  duration: string;
}

export interface CardProps {
  item: PortfolioItem;
  isActive: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}
