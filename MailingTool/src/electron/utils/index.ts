export const sleep = (second: number) => <T>(callback: (props: T) => any, props: T) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve(callback(props))
        }, second * 1000)
    })
}