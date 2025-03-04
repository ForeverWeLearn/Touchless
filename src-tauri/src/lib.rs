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

#[derive(Debug)]
struct Hotkey {
    action: HotkeyAction,
}

#[derive(Debug)]
enum HotkeyAction {
    Cut,
    Copy,
    Paste,
    CloseTab,
    Select_All,
    Undo,
    Redo,
    Save, 
    Select_Line,
    Deselect_Line,
    ChangeTab_Right,
    ChangeTab_Left,
    ChangeApp_Right,
    ChangeApp_Left,
    CloseApp,
}

#[tauri::command]
// invoke("perform_hotkey", { hotkey: "Copy"});
//hotkey default
//custom, create new hotkey(comming soon)
fn perform_hotkey(state: State<AppState>, hotkey: HotkeyAction) {
    let mut enigo = state.enigo.lock().unwrap();

    match hotkey {
        HotkeyAction::Cut => {
            // ctrl+X
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('x'), Press).expect("X press");
            enigo.key(Key::Unicode('x'), Release).expect("X release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Copy => {
            // ctrl+C
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('c'), Press).expect("C press");
            enigo.key(Key::Unicode('c'), Release).expect("C release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Paste => {
            // ctrl+V
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('v'), Press).expect("V press");
            enigo.key(Key::Unicode('v'), Release).expect("V release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::CloseTab => {
            // ctrl+W
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('w'), Press).expect("W press");
            enigo.key(Key::Unicode('w'), Release).expect("W release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Select_All => {
            // ctrl+A
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('a'), Press).expect("A press");
            enigo.key(Key::Unicode('a'), Release).expect("A release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Undo => {
            // ctrl+Z
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('z'), Press).expect("Z press");
            enigo.key(Key::Unicode('z'), Release).expect("Z release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Redo => {
            // ctrl+Y
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('y'), Press).expect("Y press");
            enigo.key(Key::Unicode('y'), Release).expect("Y release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Save => {
            // ctrl+S
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Unicode('s'), Press).expect("S press");
            enigo.key(Key::Unicode('s'), Release).expect("S release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::Select_Line => {
            // Shift+Home
            enigo.key(Key::Shift, Press).expect("shift");
            enigo.key(Key::Home, Press).expect("Home press");
            enigo.key(Key::Home, Release).expect("Home release");
            enigo.key(Key::Shift, Release).expect("shift");
        },HotkeyAction::Deselect_Line => {
            // Shift+End
            enigo.key(Key::Shift, Press).expect("Shift");
            enigo.key(Key::End, Press).expect("End press");
            enigo.key(Key::End, Release).expect("End release");
            enigo.key(Key::Shift, Release).expect("Shift");
        },
        HotkeyAction::ChangeTab_Right => {
            // ctrl+tab
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Tab, Press).expect("tab press");
            enigo.key(Key::Tab, Release).expect("tab release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::ChangeTab_Left => {
            // ctrl+Shift+tab
            enigo.key(Key::Control, Press).expect("ctrl");
            enigo.key(Key::Shift, Press).expect("Shift press");
            enigo.key(Key::Tab, Press).expect("tab press");
            enigo.key(Key::Tab, Release).expect("tab release");
            enigo.key(Key::Shift, Release).expect("Shift release");
            enigo.key(Key::Control, Release).expect("ctrl");
        },
        HotkeyAction::ChangeApp_Right => {
            // alt+tab
            enigo.key(Key::Alt, Press).expect("alt");
            enigo.key(Key::Tab, Press).expect("tab press");
            enigo.key(Key::Tab, Release).expect("tab release");
            enigo.key(Key::Alt, Release).expect("alt");
        },
        HotkeyAction::ChangeApp_Left => {
            // alt+Shift+tab
            enigo.key(Key::Alt, Press).expect("Alt");
            enigo.key(Key::Shift, Press).expect("Shift press");
            enigo.key(Key::Tab, Press).expect("tab press");
            enigo.key(Key::Tab, Release).expect("tab release");
            enigo.key(Key::Shift, Release).expect("Shift release");
            enigo.key(Key::Alt, Release).expect("Alt");
        },
        HotkeyAction::CloseApp => {
            // ctrl+alt+F4
            enigo.key(Key::Control, Press).expect("control");
            enigo.key(Key::Alt, Press).expect("alt");
            enigo.key(Key::F4, Press).expect("f4");
            enigo.key(Key::F4, Release).expect("f4");
            enigo.key(Key::Alt, Release).expect("alt");
            enigo.key(Key::Control, Release).expect("control");
            // Enter
            enigo.key(Key::Unicode('\n'), Press).expect("Enter");
            enigo.key(Key::Unicode('\n'), Release).expect("Enter");
        },
    }
}
