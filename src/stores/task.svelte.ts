import type { Command, Key, KeySequence } from "../scripts/utils/const";
import { checkFileExist, COMMAND_DATA_FILE, KEY_SEQUENCE_DATA_FILE } from "../scripts/utils/path";
import { AppFileReader, LocalFileReader } from "../scripts/utils/reader";

export function getDefaultKey(): Key {
  return {
    key: "Enter",
    direction: "Click",
  };
}

export function getDefaultKeySequence(): KeySequence {
  return {
    name: "Key Sequence",
    sequence: [getDefaultKey()],
  };
}

export function getDefaultCommand(): Command {
  return {
    name: "Command",
    comamnd: "shutdown",
  };
}

let keySequences: KeySequence[] = $state(await loadKeySequenceData());
let commands: Command[] = $state(await loadCommandData());

function createKeySequenceStore() {
  const getKeySequenceByName = (name: string): Key[] => {
    for (const sequence of keySequences) {
      if (sequence.name == name) {
        return sequence.sequence;
      }
    }
    return [];
  };

  const push = (new_sequence: KeySequence = getDefaultKeySequence()) => {
    keySequences.push(new_sequence);
  };

  const pushKey = (key_sequence: KeySequence, new_key: Key = getDefaultKey()) => {
    key_sequence.sequence.push(new_key);
  };

  const insert = (index: number, new_sequence: KeySequence = getDefaultKeySequence()) => {
    keySequences.splice(index, 0, new_sequence);
  };

  const insertKey = (key_sequence: KeySequence, index: number, new_key: Key = getDefaultKey()) => {
    key_sequence.sequence.splice(index, 0, new_key);
  };

  const remove = (key_sequence: KeySequence) => {
    const index = keySequences.indexOf(key_sequence);

    if (index == -1) {
      return;
    }

    keySequences.splice(index, 1);
  };

  const remove_key = (key_sequence: KeySequence, key: Key) => {
    const index = key_sequence.sequence.indexOf(key);

    if (index == -1) {
      return;
    }

    key_sequence.sequence.splice(index, 1);
  };

  return {
    get key_sequences() {
      return keySequences;
    },
    getKeySequenceByName,
    push,
    pushKey,
    insert,
    insertKey,
    remove,
    remove_key,
  };
}

function createCommandStore() {
  const getCommandByName = (name: string): string => {
    for (const cmd of commands) {
      if (cmd.name == name) {
        return cmd.comamnd;
      }
    }
    return "";
  };

  const push = (new_command: Command = getDefaultCommand()) => {
    commands.push(new_command);
  };

  const insert = (index: number, new_command: Command = getDefaultCommand()) => {
    commands.splice(index, 0, new_command);
  };

  const remove = (command: Command) => {
    const index = commands.indexOf(command);

    if (index == -1) {
      return;
    }

    commands.splice(index, 1);
  };

  return {
    get commands() {
      return commands;
    },
    getCommandByName,
    push,
    insert,
    remove,
  };
}

async function loadKeySequenceData(): Promise<KeySequence[]> {
  const keySequenceExist = await checkFileExist(KEY_SEQUENCE_DATA_FILE.DEST, KEY_SEQUENCE_DATA_FILE.NAME);

  if (keySequenceExist) {
    return (await AppFileReader.keySequenceData()) as KeySequence[];
  }
  return await LocalFileReader.defaultKeySequences();
}

async function loadCommandData(): Promise<Command[]> {
  const commandExist = await checkFileExist(COMMAND_DATA_FILE.DEST, COMMAND_DATA_FILE.NAME);

  if (commandExist) {
    return (await AppFileReader.commandData()) as Command[];
  }

  return await LocalFileReader.defaultCommands();
}

export const keySequenceStore = createKeySequenceStore();
export const commandStore = createCommandStore();
