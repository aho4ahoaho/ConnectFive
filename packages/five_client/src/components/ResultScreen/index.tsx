import { GoStoneType, GoBoard } from '../GoBoard';
import style from './style.module.scss';

type ResultScreenProps = {
    board: GoStoneType[][];
    isWin: boolean;
    winner_name?: string;
};

export const ResultScreen = ({
    board,
    isWin,
    winner_name,
}: ResultScreenProps) => {
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.result}>{isWin ? '勝利' : '敗北'}</div>
                <div className={style.winner}>勝者:{winner_name}</div>
            </div>
            <div>
                <GoBoard board={board} />
            </div>
        </>
    );
};
