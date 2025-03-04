export type BoardState = {
  show: boolean;
};

export const board_state = $state({ show: false } as BoardState);
