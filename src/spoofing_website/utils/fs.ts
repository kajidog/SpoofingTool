import fs from "fs";
import mkdirp from "mkdirp"
import { dirname } from "path"

/**
 * ファイル保存
 * @module delay
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export function saveFile(
    fileName: string,
    data: string | NodeJS.ArrayBufferView
) {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(fileName, data, (error) => {
            error ? reject(error) : resolve();
            return;
        });
    });
}

export async function writeFile(path: string, contents: string, callback: fs.NoParamCallback) {
    await mkdirp(dirname(path))
    fs.appendFile(path, contents, callback);
}

export async function readFile(path: string) {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}