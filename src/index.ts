import { sign, filter, hash } from "./addon";

const callbackSign = (key: string, url: string, callback: (auth: URLSearchParams | undefined) => void) => callback(commonSign(key, url));
const syncSign = (key: string, url: string): URLSearchParams | undefined => commonSign(key, url);
const asyncSign = (key: string, url: string) => new Promise<URLSearchParams | undefined>((resolve) => resolve(commonSign(key, url)));
const multiSign = (keys: string[], url: string) => new Promise<URLSearchParams | undefined>((resolve) => {
    try {
        const param = url.split("?")[1] || url;
        const query = new URLSearchParams(param);
        const parsedParam = filter(param);

        Promise.all(keys.map((key) =>
            new Promise<URLSearchParams | undefined>((resolve) => {
                const auth = hash(key, parsedParam);
                resolve(auth === query.get("sign") ? query : undefined);
            })))
            .then((auth) => resolve(auth.filter(i => i)[0]))
            .catch(() => resolve(undefined));

    } catch { resolve(undefined) }
})

const commonSign = (key: string, url: string): URLSearchParams | undefined => {
    try {
        const param = url.split("?")[1] || url;
        const query = new URLSearchParams(param);
        const auth = sign(key, param);
        return auth === query.get("sign") ? query : undefined;
    } catch { undefined }
}

export default {
    syncSign,
    asyncSign,
    callbackSign,
    multiSign,
    native: {
        sign,
        hash,
        filter
    }
}
