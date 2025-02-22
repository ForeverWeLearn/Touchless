import { writable } from "svelte/store";

function create() {
  return writable({
    hold_time: 0,
    gesture_label: "NONE",
    scanning: false
  });
}

export const hand_result_left = create();
export const hand_result_right = create();
