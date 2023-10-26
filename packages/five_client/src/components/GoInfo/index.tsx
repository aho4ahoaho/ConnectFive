import { GoStoneType } from '../GoBoard';
import { GoStone } from '../GoStone';
import style from './style.module.scss';

export type GoInfoProps = {
    myColor?: GoStoneType;
    opponentName?: string;
    turn?: GoStoneType;
};

export const GoInfo = ({ myColor, opponentName, turn }: GoInfoProps) => {
    return (
        <div className={style.wrapper}>
            <div className={style.row}>
                {myColor && (
                    <div className={style.vertical}>
                        <p>自分の色</p>
                        <GoStone color={myColor} size={32} />
                    </div>
                )}
                {myColor === turn ? (
                    <div className={style.vertical}>
                        <p className={style.big}>自分のターン</p>
                    </div>
                ) : (
                    <div className={style.vertical}>
                        <p className={style.big}>相手のターン</p>
                    </div>
                )}
                {turn && (
                    <div className={style.vertical}>
                        <p>現在のターン</p>
                        <GoStone color={turn} size={32} />
                    </div>
                )}
            </div>
            {opponentName && (
                <div className={style.row}>対戦相手:{opponentName}</div>
            )}
        </div>
    );
};
