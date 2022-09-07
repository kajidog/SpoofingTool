import Encoding from 'encoding-japanese';

export const toUTF8 = (buff: Buffer) => {
    const utf8Array = Encoding.convert(buff, {
        to: "UNICODE",
        from: "SJIS"
    },)
    return Encoding.codeToString(utf8Array)
}

export const checkEncode = (buff: Buffer) => {
    console.log(Encoding.detect(buff));

    return Encoding.detect(buff) as Encoding.Encoding;
}