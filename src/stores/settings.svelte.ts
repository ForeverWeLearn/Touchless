import { getDefaultSettings, type Settings } from "../types/settings";

export const settings: Settings = $state(getDefaultSettings());
