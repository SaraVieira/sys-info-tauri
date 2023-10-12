// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::path::PathBuf;
use sysinfo::DiskExt;
use sysinfo::{System, SystemExt};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![refresh_info, system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(serde::Serialize, Debug)]
struct Disk {
    name: String,
    file_system: Vec<u8>,
    mount_point: PathBuf,
    total_space: u64,
    available_space: u64,
    is_removable: bool,
}
#[derive(serde::Serialize)]
struct ReturnSystem {
    name: Option<String>,
    kernel_version: Option<String>,
    os_version: Option<String>,
    host_name: Option<String>,
}

#[derive(serde::Serialize)]
struct CustomResponse {
    system: ReturnSystem,
    disks: Vec<Disk>,
}

fn get_info() -> CustomResponse {
    let mut disks = vec![];
    let mut sys = System::new_all();

    sys.refresh_disks();

    for disk in sys.disks() {
        disks.push(Disk {
            name: disk.name().to_str().unwrap().to_string(),
            file_system: disk.file_system().to_vec(),
            mount_point: disk.mount_point().to_path_buf(),
            total_space: disk.total_space(),
            available_space: disk.available_space(),
            is_removable: disk.is_removable(),
        })
    }

    let system = ReturnSystem {
        name: sys.name(),
        kernel_version: sys.kernel_version(),
        os_version: sys.os_version(),
        host_name: sys.host_name(),
    };

    CustomResponse { disks, system }
}

#[tauri::command]
fn system_info() -> CustomResponse {
    get_info()
}

#[tauri::command]
fn refresh_info() -> CustomResponse {
    get_info()
}
