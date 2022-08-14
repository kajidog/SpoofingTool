import { BrowserWindow } from "electron"

export interface APIChannels {
    nameAPI: string,
    validSendChannel: SendChannels,
    validReceiveChannel: string[]
}

export interface SendChannels {
    [key: string]: Function
}

export type SendChannel<T> = (mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: T) => void | Promise<void>;