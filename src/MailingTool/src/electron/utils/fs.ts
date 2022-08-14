import fs from "fs"

export const readFile = (path: string) => {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(path, (error, data,) => {
            if (error) {
                reject(error)
                return
            }
            resolve(data)
        });
    })
}