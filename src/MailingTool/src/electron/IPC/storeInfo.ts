import { SendChannel, SendChannels } from "./General/channelsInterface";
import { getStore, setStore } from "./General/store";
import IPC from "./General/IPC";
import { dialog } from "electron";
import { readFile } from "../utils/fs";
import { toUTF8 } from "../utils/encode";


// __________________________________________________
// 
const CONFIG_KEY = "mail_config"
const CONFIG_TO_KEY = "to_config";
const CONFIG_SERVER_KEY = "server_config";
const CONFIG_BODY_TEXT_KEY = "body_text_config";
const CONFIG_SUBJECT_KEY = "subject_config";

const nameAPI = "storeInfo";

const requestConfig: SendChannel<undefined> = async (mainWindow) => {
    const to = getStore<string>(CONFIG_TO_KEY);
    const server = getStore<string>(CONFIG_SERVER_KEY);
    const bodyText = getStore<string>(CONFIG_BODY_TEXT_KEY);
    const subject = getStore<string>(CONFIG_SUBJECT_KEY);
    const path = getStore<string>(CONFIG_KEY);
    const text = await readFile(path).then(toUTF8).catch(() => "");

    mainWindow.webContents.send("getConfig", {
        mailTo: to,
        server: server,
        csv: text,
        bodyText: bodyText,
        subject
    });
}

const selectConfig: SendChannel<undefined> = async (mainWindow) => {
    const path = getStore<string>(CONFIG_KEY);
    const paths = dialog.showOpenDialogSync(mainWindow, {
        buttonLabel: '開く',
        defaultPath: path,
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
        return;
    }

    // ファイルの内容を返却
    try {
        const path = paths[0];
        const buff = await readFile(path);
        setStore(CONFIG_KEY, path); // 取得したパスを保存
        mainWindow.webContents.send("getConfig", {
            csv: toUTF8(buff)
        }); // 取得したことをレンダラーに通信
    }
    catch (error) {
        return;
    }
}


type saveConfigProps = {
    mailTo?: string;
    serverURL?: string;
    bodyText?: string;
    subject?: string
}
const saveConfig: SendChannel<saveConfigProps> = async (__, _, messages) => {
    messages.mailTo && setStore(CONFIG_TO_KEY, messages.mailTo);
    messages.serverURL && setStore(CONFIG_SERVER_KEY, messages.serverURL);
    messages.bodyText && setStore(CONFIG_BODY_TEXT_KEY, messages.bodyText);
    messages.subject && setStore(CONFIG_SUBJECT_KEY, messages.subject);
}


// ________________________________________________-
//


// to Main
const validSendChannel: SendChannels = {
    "requestConfig": requestConfig,
    "selectConfig": selectConfig,
    "saveConfig": saveConfig,
};

// from Main
const validReceiveChannel: string[] = [
    "getConfig",
];

export const storeInfo = new IPC({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});

export default storeInfo;