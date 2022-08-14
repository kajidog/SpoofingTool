import Store from "electron-store"
const store = new Store();
export const getStore = <T>(key: string): T => store.get(key) as T;
export const setStore = (key: string, value: string) => store.set(key, value)
export const deleteStore = store.delete
export const clearStore = store.clear
