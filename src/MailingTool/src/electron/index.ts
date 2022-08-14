import { app } from 'electron';
import { autoUpdater } from "electron-updater";
import path from "path";

import CustomWindow from "./customWindow";

import systemInfo from './IPC/systemInfo';
import updaterInfo from './IPC/updaterInfo';
import windowControls from './IPC/windowControls';
import fileControl from './IPC/fileControl';
import storeInfo from './IPC/storeInfo';
import mailControls from './IPC/mailControls';

require('electron-reload')(__dirname);

let mainWindow: CustomWindow;

// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendArgument('disable-gpu');

app.on('ready', async () => {
    await createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

async function createMainWindow() {
    const settings = {
        title: "SpoofingTool - MailingTool"
    };
    mainWindow = new CustomWindow(settings);
    const urlPage = path.join(__dirname, 'www', 'index.html');
    mainWindow.createWindow(urlPage);

    await mainWindow.setIpcMain([systemInfo, storeInfo, updaterInfo, fileControl, windowControls, mailControls]);

    updaterInfo.initAutoUpdater(autoUpdater, mainWindow.window);
}