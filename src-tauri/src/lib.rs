use enigo::{
    Coordinate,
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Mouse, Settings,
};
use serde::{Deserialize, Serialize};
use std::process::Command;
use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Manager, State, WindowEvent,
};
struct AppState {
    enigo: Mutex<Enigo>,
}

#[derive(Deserialize)]
pub struct KeySequenceEntry {
    key: String,
    direction: String,
}

#[derive(Debug, Serialize, Deserialize)]
enum MouseTask {
    Move,
    Click,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            let window = app.get_webview_window("main").unwrap();
            let _ = window.unminimize();
            let _ = window.show();
            let _ = window.set_focus();
        }))
        .manage(AppState {
            enigo: Mutex::new(Enigo::new(&Settings::default()).unwrap()),
        })
        .invoke_handler(tauri::generate_handler![
            mouse,
            execute_key_sequence,
            execute_command,
            execute_text
        ])
        .setup(|app| {
            //Close but the app will hide in the system tray
            let window = app.get_webview_window("main").unwrap();
            let window_clone = window.clone();
            let _overlay = app.get_webview_window("overlay").unwrap();
            window.on_window_event(move |event| match event {
                WindowEvent::CloseRequested { api, .. } => {
                    api.prevent_close();
                    let _ = window_clone.hide();
                    // let _ = overlay.show();
                }
                _ => {}
            });

            //Hide overlay
            let overlay = app.get_webview_window("overlay").unwrap();
            let overlay_clone = overlay.clone();
            overlay.on_window_event(move |event| match event {
                WindowEvent::CloseRequested { api, .. } => {
                    api.prevent_close();
                    let _ = overlay_clone.hide();
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
                        if let Some(overlay) = app.get_webview_window("overlay") {
                            overlay.hide().unwrap();
                        }
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
                                if let Some(overlay) = app.get_webview_window("overlay") {
                                    overlay.show().unwrap();
                                }
                            } else {
                                let _ = window.unminimize();
                                window.show().unwrap();
                                window.set_focus().unwrap();
                                if let Some(overlay) = app.get_webview_window("overlay") {
                                    overlay.hide().unwrap();
                                }
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
fn execute_command(command: &str) {
    let _ = Command::new("cmd").args(&["/C", command]).spawn().ok();
}

#[tauri::command]
fn execute_text(state: State<AppState>, text: &str) {
    let mut enigo = state.enigo.lock().unwrap();
    enigo.text(text).unwrap();
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
            "CapsLock" => Key::CapsLock,
            "Home" => Key::Home,
            "End" => Key::End,
            "Insert" => Key::Insert,
            "Delete" => Key::Delete,
            "Space" => Key::Space,
            "ArrowUp" => Key::UpArrow,
            "ArrowDown" => Key::DownArrow,
            "ArrowLeft" => Key::LeftArrow,
            "ArrowRight" => Key::RightArrow,
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
            s if s.chars().count() == 1 => Key::Unicode(s.chars().next().unwrap()),
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
}
