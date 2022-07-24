export interface Deck {
  deck_id: string;
  success: boolean;
  remaining: number;
  shuffled: boolean;
}

export interface Card {
  name: string;
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: string;
  value: string;
}

export interface SavedHand {
  hand: Card[];
  bestHand: string;
}
