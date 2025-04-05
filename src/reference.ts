export const REFERENCES = {
  SUIT_ACTIONS: 'suit-actions',
  ENGINE_CARDS: 'engine-cards',
  INSTANT_CARDS: 'instant-cards',
  SCORING: 'scoring',
} as const;

export type Reference = (typeof REFERENCES)[keyof typeof REFERENCES];
