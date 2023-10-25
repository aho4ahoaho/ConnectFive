import React from 'react';
import style from './style.module.scss';
import { concatClassNames } from '@/utils/class';
import { GoStone } from '../GoStone';

export type GoStoneType = 'black' | 'white' | 'empty';

export type GoBoardProps = {
    className?: string;
    board: GoStoneType[][];
    onClick?: (col: number, row: number) => void;
};

export const GoBoard = ({ className, board, onClick }: GoBoardProps) => {
    const [size, setSize] = React.useState<number>(0);
    const BoardSize = board.length ?? 0;
    const dynamicStyle = {
        width: size * BoardSize,
        height: size * BoardSize,
        border: `${size / 20}px solid #000`,
    };

    React.useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const size = Math.floor(Math.min(width, height) / BoardSize);
        setSize(size);
    }, [BoardSize]);

    return (
        <div className={concatClassNames(className, style.wrapper)}>
            <div className={style.board} style={dynamicStyle}>
                {board.map((line, i) => {
                    return (
                        <GoLine
                            key={i}
                            size={size}
                            line={line}
                            onClick={col => {
                                onClick?.(col, i);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const GoLine = ({
    size,
    onClick,
    line,
}: {
    size: number;
    onClick: (col: number) => void;
    line: GoStoneType[];
}) => {
    return (
        <div className={style.line}>
            {line.map((stoneType, i) => {
                return (
                    <GoGrid
                        key={i}
                        size={size}
                        stoneType={stoneType}
                        onClick={() => {
                            onClick(i);
                        }}
                    />
                );
            })}
        </div>
    );
};

const GoGrid = ({
    size,
    onClick,
    stoneType,
}: {
    size: number;
    onClick: () => void;
    stoneType: GoStoneType;
}) => {
    return (
        <div
            className={style.grid}
            style={{ width: size, height: size }}
            onClick={onClick}
        >
            {stoneType === 'empty' ? null : (
                <GoStone color={stoneType} size={Math.floor(size * 0.8)} />
            )}
        </div>
    );
};
