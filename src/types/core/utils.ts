import { KeyDirection, type Command, type Key, type KeySequence } from "./types";

export function getDefaultKey(): Key {
  return {
    key: "",
    direction: KeyDirection.CLICK,
  };
}

export function getDefaultKeySequence(): KeySequence {
  return {
    name: "New Key Sequence",
    sequence: [getDefaultKey()],
  };
}

export function getDefaultCommand(): Command {
  return {
    name: "New Command",
    comamnd: "",
  };
}

export function getDefaultKeySequences(): KeySequence[] {
  return [];
}

export function getDefaultCommands(): Command[] {
  return [];
}
