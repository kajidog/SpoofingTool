import { app, BrowserWindow, ipcMain } from 'electron';
import path from "path";
import EventEmitter from 'events';
import IPC from './IPC/General/IPC';

const appName = "SpoofingTool - MailingTool";

const defaultSettings = {
  title: "SpoofingTool - MailingTool",
  width: 1000,
  height: 750,
  titleBarStyle: 'hiddenInset',
  autoHideMenuBar: true,
  backgroundColor: '#FFF'
}

class CustomWindow {
  window!: BrowserWindow;
  settings: { [key: string]: any };
  onEvent: EventEmitter = new EventEmitter();

  constructor(settings: { [key: string]: any } | null = null) {
    this.settings = settings ? { ...defaultSettings, ...settings } : { ...defaultSettings }
  }

  createWindow(url: string) {
    let settings = { ...this.settings }
    app.name = appName;
    let window = new BrowserWindow({
      ...settings,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js")
      }
    });

    window.loadURL(url);
    window.once('ready-to-show', () => {
      window.show()
    });

    this.window = window;
    return window;
  }

  async setIpcMain(api: Array<IPC>) {
    api.forEach(async (el) => await el.initIpcMain(ipcMain, this.window));
  }
}

export default CustomWindow;