import { concatClassNames } from '@/utils/class';
import style from './style.module.scss';

export type GoStoneProps = {
    color: 'black' | 'white' | 'empty';
    className?: string;
    size?: number;
};

export const GoStone = ({ color, className, size }: GoStoneProps) => {
    return (
        <div className={className}>
            <div
                className={concatClassNames(
                    color === 'black' ? style.black : style.white,
                    style.stone
                )}
                style={{ width: size, height: size }}
            />
        </div>
    );
};
