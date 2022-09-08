import { SendChannel, SendChannels } from "./General/channelsInterface";
import IPC from "./General/IPC";
import { SendMail as SendMailUtil } from "../utils/sendMail";
import { sleep } from "../utils";


// __________________________________________________
// 

const nameAPI = "mailControls";

type SendMailProps = {
    to: string;
    from: string;
    text: string;
    subject: string;
    index: string | number;
}
const sendMail: SendChannel<SendMailProps> = async (mainWindow, _, messages) => {
    // 1秒遅らせてメール送信
    sleep(1)(SendMailUtil, {
        ...messages
    }).then(() => {
        mainWindow.webContents.send("progress", {
            state: 2,
            index: messages.index
        });
    }).catch(() => {
        mainWindow.webContents.send("progress", {
            state: 3,
            index: messages.index
        });

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
    "progress"
];

export const mailControls = new IPC({
    nameAPI,
    validSendChannel,
    validReceiveChannel
});

export default mailControls;

