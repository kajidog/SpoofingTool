import { SendChannels } from "./General/channelsInterface";
import fs from "fs"
import IPC from "./General/IPC";
import { BrowserWindow, dialog } from "electron";
import { toUTF8 } from "../utils/encode";

const nameAPI = "fileControl";

// to Main
const validSendChannel: SendChannels = {
    "fileOpen": fileOpen
};

// from Main
const validReceiveChannel: string[] = [
    "getFileInfo",
];

export const fileControl = new IPC({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});

export default fileControl;

// ________________________
// 

function fileOpen(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
    const paths = dialog.showOpenDialogSync(mainWindow, {
        buttonLabel: '開く',  // 確認ボタンのラベル
        filters: [
            { name: 'Csv', extensions: ['csv'] },
        ],
        properties: [
            'openFile',         // ファイルの選択を許可
            'createDirectory',  // ディレクトリの作成を許可 (macOS)
        ]
    });

    // キャンセルで閉じた場合
    if (paths === undefined) {
        mainWindow.webContents.send("getFileInfo", { status: undefined });
        return;
    }

    // ファイルの内容を返却
    try {
        const path = paths[0];
        const buff = fs.readFileSync(path);
        mainWindow.webContents.send("getFileInfo", {
            status: true,
            path: path,
            text: toUTF8(buff),
        });
    }
    catch (error) {
        mainWindow.webContents.send("getFileInfo", { status: false, message: error });
        return;
    }
}