import type { Command, Key, KeySequence } from "../scripts/utils/const";
import { check_file_exist, COMMAND_DATA_FILE, KEY_SEQUENCE_DATA_FILE } from "../scripts/utils/path";
import { AppFileReader, LocalFileReader } from "../scripts/utils/reader";

export function get_default_key(): Key {
  return {
    key: "Enter",
    direction: "Click",
  };
}

export function get_default_command(): Command {
  return {
    name: "Command",
    comamnd: "shutdown",
  };
}

const exist = await check_file_exist(KEY_SEQUENCE_DATA_FILE.DEST, KEY_SEQUENCE_DATA_FILE.NAME);

let key_sequence_data: any;
if (exist) {
  key_sequence_data = await AppFileReader.key_sequence_data();
} else {
  key_sequence_data = await LocalFileReader.default_key_sequences();
}

export const key_sequences: KeySequence[] = $state(key_sequence_data);

const command_exist = await check_file_exist(COMMAND_DATA_FILE.DEST, COMMAND_DATA_FILE.NAME);

let command_data: any;
if (command_exist) {
  command_data = await AppFileReader.command_data();
} else {
  command_data = await LocalFileReader.default_key_sequences();
}

function create_command_store() {
  let commands: Command[] = $state(command_data);

  const push = (new_command: Command = get_default_command()) => {
    commands.push(new_command);
  };

  const insert = (index: number, new_command: Command = get_default_command()) => {
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
    push,
    insert,
    remove,
  };
}

export const command_store = create_command_store();
