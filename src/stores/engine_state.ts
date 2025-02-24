import { writable } from "svelte/store";

export let engine_ready = writable(false);
export let engine_state = writable(false);
