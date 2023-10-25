type Status = 'menu' | 'game' | 'gameover';
type GameMenuProps = {
    setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const GameMenu = ({ setStatus }: GameMenuProps) => {
    return (
        <div
            onClick={() => {
                setStatus('game');
            }}
        >
            GameMenu
        </div>
    );
};
