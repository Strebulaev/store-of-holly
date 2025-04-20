export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
  releaseDate: Date;
  developer: string;
  publisher: string;
  torrentId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  balance: number;
  isAdmin: boolean;
}

export interface LibraryItem {
  id: string;
  userId: string;
  gameId: string;
  installedPath: string;
  playTime: number;
  lastPlayed: Date;
}

export interface Achievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  image: string;
  percent: number;
}
