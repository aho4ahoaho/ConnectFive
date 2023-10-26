'use client';

import { GoBoard, GoStoneType } from '@/components/GoBoard';
import React from 'react';
import { GameMenu, GameOptions, WaitingScreen } from '@/components/GameMenu';
import {
    PlayerData,
    SessionData,
    SessionRegister,
    UsernameRegister,
    WS_HOST,
} from '@/utils/api';
import { ResultScreen } from '@/components/ResultScreen';

const BoardSize = 13;

type Status = 'menu' | 'waiting' | 'game' | 'gameEnd';

export default function Home() {
    const [board, setBoard] = React.useState<GoStoneType[][]>([]);
    const [status, setStatus] = React.useState<Status>('menu');
    const [gameOptions, setGameOptions] = React.useState<GameOptions>({
        username: 'testName',
        password: 'testSession',
    });
    const [userdata, setUserdata] = React.useState<PlayerData>();
    const [session, setSession] = React.useState<SessionData>();
    const [socket, setSocket] = React.useState<WebSocket>();
    const [winner, setWinner] = React.useState<GoStoneType>();
    const [myColor, setMyColor] = React.useState<GoStoneType>('empty');
    const [opponentName, setOpponentName] = React.useState<string>('');

    const onGameJoin = async () => {
        const { username, password } = gameOptions;
        const userdata = await UsernameRegister(username);
        setUserdata(userdata);
        const session = await SessionRegister(userdata.id, password);
        setSession(session);

        const wsUrl = new URL(WS_HOST + 'game');
        wsUrl.searchParams.append('password', password);
        wsUrl.searchParams.append('id', userdata.id);

        const socket = new WebSocket(wsUrl.href);
        setSocket(socket);
        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log(data);
            switch (data.message) {
                case 'gameStart':
                    setStatus('game');
                    setBoard(data.board);
                    setMyColor(data.myColor);
                    setOpponentName(data.opponentName);
                    break;
                case 'waiting':
                    setStatus('waiting');
                    break;
                case 'putStone':
                    setBoard(data.board);
                    break;
                case 'gameEnd':
                    setStatus('gameEnd');
                    setWinner(data.winner);
                    break;
            }
        };
        socket.onclose = () => {
            console.log('Socket closed');
            setStatus('menu');
        };
    };

    const onBoardClick = (col: number, row: number) => {
        const res = {
            action: 'putStone',
            x: col,
            y: row,
        };
        socket?.send(JSON.stringify(res));
    };

    console.log(winner, myColor);

    return (
        <main>
            {status === 'menu' && (
                <>
                    <GameMenu
                        onGameJoin={onGameJoin}
                        gameOptions={gameOptions}
                        setGameOptions={setGameOptions}
                    />
                </>
            )}
            {status === 'waiting' && <WaitingScreen />}
            {status === 'game' && (
                <GoBoard board={board} onClick={onBoardClick} />
            )}
            {status === 'gameEnd' && (
                <ResultScreen
                    board={board}
                    isWin={winner === myColor}
                    winner_name={
                        winner === myColor ? userdata?.username : opponentName
                    }
                />
            )}
        </main>
    );
}
