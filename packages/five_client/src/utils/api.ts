export const HOST = process.env.NEXT_PUBLIC_HOST ?? 'http://localhost:3001/';
export const WS_HOST =
    process.env.NEXT_PUBLIC_WS_HOST ?? 'ws://localhost:3001/';

export const UsernameRegister = async (username: string) => {
    const data = (await fetch(HOST + 'register?name=' + username).then(res =>
        res.json()
    )) as PlayerData;
    return data;
};
export type PlayerData = {
    username: string;
    id: string;
    createdAt: Date;
    lastLogin: Date;
};

export const SessionRegister = async (id: string, password: string) => {
    const data = (await fetch(
        HOST + 'session?id=' + id + '&password=' + password
    ).then(res => res.json())) as SessionData;
    return data;
};
export type SessionData = {
    status: string;
    player: PlayerData;
    password: string;
};
