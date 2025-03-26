import { getDefaultKey, getDefaultKeySequence, type Key, type KeySequence } from "../../types/core";
import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";

let keySequences: KeySequence[] = $state(
  await AppFileReader.readDataFile(DataFileType.KEY_SEQUENCE, DEFAULT_FLOW_NAME)
);

function createKeySequenceStore() {
  const getKeySequenceByName = (name: string): Key[] => {
    for (const sequence of keySequences) {
      if (sequence.name == name) {
        return sequence.sequence;
      }
    }
    return [];
  };

  const push = (newSequence: KeySequence = getDefaultKeySequence()) => {
    keySequences.push(newSequence);
  };

  const pushFront = (newSequence: KeySequence = getDefaultKeySequence()) => {
    keySequences.unshift(newSequence);
  };

  const pushKey = (keySequence: KeySequence, newKey: Key = getDefaultKey()) => {
    keySequence.sequence.push(newKey);
  };

  const insert = (index: number, newSequence: KeySequence = getDefaultKeySequence()) => {
    keySequences.splice(index, 0, newSequence);
  };

  const insertKey = (keySequence: KeySequence, index: number, new_key: Key = getDefaultKey()) => {
    keySequence.sequence.splice(index, 0, new_key);
  };

  const remove = (keySequence: KeySequence) => {
    const index = keySequences.indexOf(keySequence);

    if (index == -1) {
      return;
    }

    keySequences.splice(index, 1);
  };

  const remove_key = (keySequence: KeySequence, key: Key) => {
    const index = keySequence.sequence.indexOf(key);

    if (index == -1) {
      return;
    }

    keySequence.sequence.splice(index, 1);
  };

  return {
    get keySequences() {
      return keySequences;
    },
    getKeySequenceByName,
    push,
    pushFront,
    pushKey,
    insert,
    insertKey,
    remove,
    remove_key,
  };
}
export const keySequenceStore = createKeySequenceStore();
