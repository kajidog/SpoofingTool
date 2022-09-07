import { generateContextBridge } from "./IPC/General/contextBridge"

import systemInfo from "./IPC/systemInfo";
import updaterInfo from './IPC/updaterInfo';
import windowControls from './IPC/windowControls'
import fileControl from './IPC/fileControl'
import storeInfo from './IPC/storeInfo'
import mailControls from "./IPC/mailControls";
generateContextBridge([systemInfo, updaterInfo, windowControls, fileControl, storeInfo, mailControls]);
