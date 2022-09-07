import { SendChannel, SendChannels } from "./General/channelsInterface";
import { getStore, setStore } from "./General/store";
import IPC from "./General/IPC";
import { dialog } from "electron";
import { readFile } from "../utils/fs";
import { toUTF8 } from "../utils/encode";
import { SendMail as SendMailUtil } from "../utils/sendMail";


// __________________________________________________
// 

const nameAPI = "mailControls";

type SendMailProps = {
    to: string;
    from: string;
    text: string;
    subject: string;
}
const sendMail: SendChannel<SendMailProps> = async (mainWindow, _, messages) => {
    console.log(messages);
    SendMailUtil({
        ...messages
    })

}


// ________________________________________________-
//


// to Main
const validSendChannel: SendChannels = {
    "sendMail": sendMail,
};

// from Main
const validReceiveChannel: string[] = [
    "doneMail",
];

export const mailControls = new IPC({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});

export default mailControls;

