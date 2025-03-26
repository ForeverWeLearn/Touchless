export type KeyReceiver = {
  listening: boolean;
  keyState: KeyState | null;
};

export type KeyState = {
  key: string;
  alt: boolean;
  ctrl: boolean;
  shift: boolean;
};

const keyState: KeyState = $state({ key: "", alt: false, ctrl: false, shift: false });
const keyMap = (char: string) => {
  if (char == " ") {
    return "Space";
  }
  return char;
};

let listening = $state(false);
let keyReceiver: KeyReceiver | null = null;

export function handleKeyDown(event: KeyboardEvent) {
  if (listening) {
    event.preventDefault();

    keyState.key = keyMap(event.key);
    keyState.alt = event.altKey;
    keyState.ctrl = event.ctrlKey;
    keyState.shift = event.shiftKey;

    if (keyState.alt || keyState.ctrl || keyState.shift) {
      
    }

    console.log(`Key "${event.key}" captured!`);

    if (keyReceiver && keyReceiver.listening) {
      keyReceiver.keyState = { ...keyState };
      keyReceiver.listening = false;
      keyReceiver = null;
    }

    listening = false;
  }
}

function createStore() {
  const bindReceiver = (receiver: KeyReceiver) => {
    keyReceiver = receiver;
  };

  const listen = () => {
    listening = true;
  };

  const stopListen = () => {
    listening = false;
  };

  return {
    get listening() {
      return listening;
    },
    get keyState() {
      return keyState;
    },
    bindReceiver,
    listen,
    stopListen,
  };
}

export const userKeyStore = createStore();
