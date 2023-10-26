import React from 'react';
import style from './style.module.scss';
import { concatClassNames } from '@/utils/class';

type Status = 'menu' | 'game' | 'gameover';
export type GameOptions = {
    username: string;
    password: string;
};
type GameMenuProps = {
    onGameJoin: () => void;
    setGameOptions: React.Dispatch<React.SetStateAction<GameOptions>>;
    gameOptions: GameOptions;
};

export const GameMenu = ({
    onGameJoin,
    gameOptions,
    setGameOptions,
}: GameMenuProps) => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>五目並べ</div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (
                        gameOptions.username === '' ||
                        gameOptions.password === ''
                    ) {
                        alert('Please enter a username');
                    } else {
                        onGameJoin();
                    }
                }}
            >
                <p>プレイヤー名</p>
                <input
                    className={style.text}
                    type="text"
                    value={gameOptions.username}
                    onChange={e => {
                        setGameOptions({
                            ...gameOptions,
                            username: e.target.value,
                        });
                    }}
                    placeholder="Username"
                />
                <p>合言葉</p>
                <input
                    className={style.text}
                    type="text"
                    value={gameOptions.password}
                    onChange={e => {
                        setGameOptions({
                            ...gameOptions,
                            password: e.target.value,
                        });
                    }}
                    placeholder="Password"
                />

                <input type="submit" className={style.button} value="Join" />
            </form>
        </div>
    );
};

export const WaitingScreen = ({ password }: { password?: string }) => {
    return (
        <div className={concatClassNames(style.wrapper, style.waitingScreen)}>
            <div className={style.title}>対戦相手を待っています</div>
            <div className={style.pass}>合言葉: {password}</div>
            <div className={style.progress}></div>
        </div>
    );
};
