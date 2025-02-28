use enigo::{
    Coordinate,
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Mouse, Settings,
};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

struct AppState {
    enigo: Mutex<Enigo>,
}

#[tauri::command]
fn move_mouse(pos: &str, state: State<AppState>) {
    let mut enigo = state.enigo.lock().unwrap();

    let coord: Vec<usize> = pos
        .split_whitespace()
        .map(|s| s.parse().expect("Failed to parse number"))
        .collect();

    let _ = enigo.move_mouse(
        coord[0].try_into().unwrap(),
        coord[1].try_into().unwrap(),
        Coordinate::Abs,
    );
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .manage(AppState {
            enigo: Mutex::new(Enigo::new(&Settings::default()).unwrap()),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            move_mouse,
            perform_hotkey
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Serialize, Deserialize)]
struct Hotkey {
    action: HotkeyAction,
}

#[derive(Debug, Serialize, Deserialize)]
enum HotkeyAction {
    Copy,
    Paste,
    CloseTab,
    SelectAll,
    Undo,
    Redo,
    Save,
    SelectLine,
    DeselectLine,
    ShowDesktop,
    ChangeTabRight,
    ChangeTabLeft,
    ChangeAppRight,
    ChangeAppLeft,
    CloseApp,
}

#[tauri::command]
// invoke("perform_hotkey", { hotkey: "Copy"});
//hotkey default
//custom, create new hotkey(comming soon)
fn perform_hotkey(state: State<AppState>, hotkey: HotkeyAction) {
    let mut enigo = state.enigo.lock().unwrap();

    match hotkey {
        HotkeyAction::Copy => {
            // Ctrl + C
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('c'), Click).expect("C click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::Paste => {
            // Ctrl + V
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('v'), Click).expect("V click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::CloseTab => {
            // Ctrl + W
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('w'), Click).expect("W click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::SelectAll => {
            // Ctrl + A
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('a'), Click).expect("A click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::Undo => {
            // Ctrl + Z
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('z'), Click).expect("Z click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::Redo => {
            // Ctrl + Y
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('y'), Click).expect("Y click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::Save => {
            // Ctrl + S
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Unicode('s'), Click).expect("S click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::SelectLine => {
            // Ctrl + S
            enigo.key(Key::Shift, Press).expect("Shift press");
            enigo.key(Key::Home, Click).expect("Home click");
            enigo.key(Key::Shift, Release).expect("Shift release");
        }
        HotkeyAction::DeselectLine => {
            // Ctrl + S
            enigo.key(Key::Shift, Press).expect("Shift press");
            enigo.key(Key::End, Click).expect("End click");
            enigo.key(Key::Shift, Release).expect("Shift release");
        }
        HotkeyAction::ShowDesktop => {
            // Meta + D
            enigo.key(Key::Meta, Press).expect("Meta press");
            enigo.key(Key::Unicode('d'), Click).expect("D click");
            enigo.key(Key::Meta, Release).expect("Meta release");
        }
        HotkeyAction::ChangeTabRight => {
            // Ctrl + Tab
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Tab, Click).expect("Tab click");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::ChangeTabLeft => {
            // Ctrl + Shift + Tab
            enigo.key(Key::Control, Press).expect("Ctrl press");
            enigo.key(Key::Shift, Press).expect("Shift press");
            enigo.key(Key::Tab, Click).expect("Tab click");
            enigo.key(Key::Shift, Release).expect("Shift release");
            enigo.key(Key::Control, Release).expect("Ctrl release");
        }
        HotkeyAction::ChangeAppRight => {
            // Alt + Tab
            enigo.key(Key::Alt, Press).expect("Alt press");
            enigo.key(Key::Tab, Click).expect("Tab click");
            enigo.key(Key::Alt, Release).expect("Alt release");
        }
        HotkeyAction::ChangeAppLeft => {
            // Alt + Shift + Tab
            enigo.key(Key::Alt, Press).expect("Alt press");
            enigo.key(Key::Shift, Press).expect("Shift press");
            enigo.key(Key::Tab, Click).expect("Tab click");
            enigo.key(Key::Shift, Release).expect("Shift release");
            enigo.key(Key::Alt, Release).expect("Alt release");
        }
        HotkeyAction::CloseApp => {
            // Alt + F4
            enigo.key(Key::Alt, Press).expect("Alt press");
            enigo.key(Key::F4, Click).expect("F4 click");
            enigo.key(Key::Alt, Release).expect("Alt release");
            // Enter
            enigo.key(Key::Unicode('\n'), Click).expect("Enter click");
        }
    }
}
