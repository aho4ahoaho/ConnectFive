'use client';

import { GoBoard, GoStoneType } from '@/components/GoBoard';
import React from 'react';
import { GameMenu } from '@/components/GameMenu';

const BoardSize = 13;

type Status = 'menu' | 'game' | 'gameover';

export default function Home() {
    const [board, setBoard] = React.useState<GoStoneType[][]>([]);
    const [status, setStatus] = React.useState<Status>('menu');

    React.useEffect(() => {
        const board = Array(BoardSize)
            .fill(0)
            .map(() => {
                return Array(BoardSize).fill('empty');
            });
        setBoard(board);
    }, []);

    const onBoardClick = (col: number, row: number) => {
        setBoard(board => {
            return board.map((line, i) => {
                if (i !== row) {
                    return line;
                }
                return line.map((stoneType, j) => {
                    if (j !== col) {
                        return stoneType;
                    }
                    return stoneType === 'empty' ? 'black' : 'empty';
                });
            });
        });
    };

    return (
        <main>
            {status === 'menu' && <GameMenu setStatus={setStatus} />}
            {status === 'game' && (
                <GoBoard board={board} onClick={onBoardClick} />
            )}
        </main>
    );
}
