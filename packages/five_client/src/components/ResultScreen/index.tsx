import { GoStoneType, GoBoard } from '../GoBoard';
import style from './style.module.scss';

type ResultScreenProps = {
    board: GoStoneType[][];
    isWin: boolean;
    winner_name?: string;
    onBackToMenu?: () => void;
};

export const ResultScreen = ({
    board,
    isWin,
    winner_name,
    onBackToMenu,
}: ResultScreenProps) => {
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.result}>{isWin ? '勝利' : '敗北'}</div>
                <div className={style.winner}>勝者:{winner_name}</div>
                <input
                    className={style.button}
                    type="button"
                    value="メニューに戻る"
                    onClick={onBackToMenu}
                />
            </div>
            <div>
                <GoBoard board={board} />
            </div>
        </>
    );
};
