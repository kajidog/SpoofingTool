import Sendmail from "sendmail"

const sendmail = Sendmail({});

export const SendMail = (mail: Sendmail.MailInput) => {
    return new Promise<void>((resolve, reject) => {
        sendmail(
            mail,
            function (err) {
                if (err !== null) {
                    reject(err.stack)
                    return
                }
                console.log("送信成功: ", mail.to);
                resolve()
            }
        )
    })
}