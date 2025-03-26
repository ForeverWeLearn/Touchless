import { getDefaultCommand, type Command } from "../../types/core";
import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";

let commands: Command[] = $state(await AppFileReader.readDataFile(DataFileType.COMMAND, DEFAULT_FLOW_NAME));

function createCommandStore() {
  const getCommandByName = (name: string): string => {
    for (const cmd of commands) {
      if (cmd.name == name) {
        return cmd.comamnd;
      }
    }
    return "";
  };

  const push = (newCommand: Command = getDefaultCommand()) => {
    commands.push(newCommand);
  };

  const pushFront = (newCommand: Command = getDefaultCommand()) => {
    commands.unshift(newCommand);
  };

  const insert = (index: number, newCommand: Command = getDefaultCommand()) => {
    commands.splice(index, 0, newCommand);
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
    pushFront,
    insert,
    remove,
  };
}

export const commandStore = createCommandStore();
