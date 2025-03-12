import type { Command, Key, KeySequence } from "../scripts/utils/const";
import { check_file_exist, KEY_SEQUENCE_DATA_FILE } from "../scripts/utils/path";
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
export const commands: Command[] = $state([get_default_command()]);
