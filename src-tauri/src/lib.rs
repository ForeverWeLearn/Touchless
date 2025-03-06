use enigo::{
    Coordinate,
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Mouse, Settings,
};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Manager, State, WindowEvent,
};

struct AppState {
    enigo: Mutex<Enigo>,
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

#[derive(Debug, Serialize, Deserialize)]
enum MouseTask {
    Move,
    Click,
}

#[derive(Deserialize)]
pub struct KeySequenceEntry {
    key: String,
    direction: String,
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
            perform_hotkey,
            mouse,
            execute_key_sequence
        ])
        .setup(|app| {
            //Close but the app will hide in the system tray
            let window = app.get_webview_window("main").unwrap();
            let window_clone = window.clone();
            window.on_window_event(move |event| match event {
                WindowEvent::CloseRequested { api, .. } => {
                    api.prevent_close();
                    let _ = window_clone.hide();
                }
                _ => {}
            });

            //Create "Open", "Quit" options when you right-click the icon in the system tray
            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let open_i = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&open_i, &quit_i])?;
            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "open" => {
                        let window = app.get_webview_window("main").unwrap();
                        let _ = window.unminimize();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                    _ => {}
                })
                // Double-click to toggle the app status
                .on_tray_icon_event(|tray, event| match event {
                    TrayIconEvent::DoubleClick {
                        button: MouseButton::Left,
                        ..
                    } => {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            if window.is_visible().unwrap() {
                                window.hide().unwrap();
                            } else {
                                let _ = window.unminimize();
                                window.show().unwrap();
                                window.set_focus().unwrap();
                            }
                        }
                    }
                    _ => {}
                })
                .build(app)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn execute_key_sequence(
    state: State<AppState>,
    sequence: Vec<KeySequenceEntry>,
) -> Result<(), String> {
    let mut enigo = state.enigo.lock().unwrap();

    for entry in sequence {
        let key = match entry.key.as_str() {
            "Control" => Key::Control,
            "Alt" => Key::Alt,
            "Shift" => Key::Shift,
            "Meta" => Key::Meta,
            "Tab" => Key::Tab,
            "Home" => Key::Home,
            "End" => Key::End,
            "F1" => Key::F1,
            "F2" => Key::F2,
            "F3" => Key::F3,
            "F4" => Key::F4,
            "F5" => Key::F5,
            "F6" => Key::F6,
            "F7" => Key::F7,
            "F8" => Key::F8,
            "F9" => Key::F9,
            "F10" => Key::F10,
            "F11" => Key::F11,
            "F12" => Key::F12,
            "Escape" => Key::Escape,
            "Enter" => Key::Unicode('\n'),
            s if s.starts_with("Unicode(") => {
                let c = s
                    .trim_start_matches("Unicode(")
                    .trim_end_matches(")")
                    .trim_matches('\'')
                    .chars()
                    .next()
                    .ok_or_else(|| format!("Invalid Unicode character in: {}", s))?;
                Key::Unicode(c)
            }
            s => return Err(format!("Unknown key: {}", s)),
        };

        let direction = match entry.direction.as_str() {
            "Press" => Press,
            "Release" => Release,
            "Click" => Click,
            s => return Err(format!("Unknown direction: {}", s)),
        };

        enigo
            .key(key, direction)
            .map_err(|e| format!("Failed to execute key: {:?}", e))?;
    }

    Ok(())
}

#[tauri::command]
fn mouse(state: State<AppState>, task: MouseTask, vector: &str) {
    let mut enigo = state.enigo.lock().unwrap();

    let coord: Vec<usize> = vector
        .split_whitespace()
        .map(|s| s.parse().expect("Failed to parse number"))
        .collect();

    match task {
        MouseTask::Click => {
            let _ = enigo.button(enigo::Button::Left, Click);
        }
        MouseTask::Move => {
            let _ = enigo.move_mouse(
                coord[0].try_into().unwrap(),
                coord[1].try_into().unwrap(),
                Coordinate::Abs,
            );
        }
    }

    let _ = enigo.move_mouse(
        coord[0].try_into().unwrap(),
        coord[1].try_into().unwrap(),
        Coordinate::Abs,
    );
}

#[tauri::command]
// invoke("perform_hotkey", { hotkey: "Copy"});
//hotkey default
//custom, create new hotkey(comming soon)
fn perform_hotkey(state: State<AppState>, action: HotkeyAction) {
    let mut enigo = state.enigo.lock().unwrap();

    match action {
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
