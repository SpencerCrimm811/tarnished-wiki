import './DrawBoard.css';

export const DrawBoard = (props) => {
    return (
    <div className="drawboard">
        <h1 className="player1">{props.player1}{'\n'}</h1>
        <h1>{'\n'}</h1>
        <h1 className="versus">versus{'\n'}</h1>
        <h1>{'\n'}</h1>
        <h1 className="player2">{props.player2}</h1>
    </div>
    )
};

export const FightButton = (props) => {
    return (
        <button className="fightbutton" ref={props.ref} onClick={props.onClick}>Fight!</button>
    )
};