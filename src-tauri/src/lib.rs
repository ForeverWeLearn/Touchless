use enigo::{
    Coordinate,
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Mouse, Settings,
};
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

#[tauri::command]
fn show_desktop(state: State<AppState>) {
    let mut enigo = state.enigo.lock().unwrap();
    
    enigo.key(Key::Meta, Press).expect("msg");
    enigo.key(Key::Unicode('d'), Click).expect("msg");
    enigo.key(Key::Meta, Release).expect("msg");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            enigo: Mutex::new(Enigo::new(&Settings::default()).unwrap()),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![move_mouse, show_desktop])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
//perform_hotkey(state, Hotkey:: ... );
//hotkey default
//custom, create new hotkey(comming soon)
fn perform_hotkey(state: State<AppState>, hotkey: Hotkey) {
    let mut enigo = state.enigo.lock().unwrap();

    match hotkey {
        Hotkey::Copy => {
            // ctrl+C
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('c'), Press).expect("C press");
            enigo.key(Key::Unicode('c'), Release).expect("C release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        Hotkey::Paste => {
            // ctrl+V
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('v'), Press).expect("V press");
            enigo.key(Key::Unicode('v'), Release).expect("V release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        Hotkey::CloseTab => {
            // ctrl+W
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('w'), Press).expect("W press");
            enigo.key(Key::Unicode('w'), Release).expect("W release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
    }
}
