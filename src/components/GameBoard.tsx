import React from "react";
import Snake from "./Snake";
import Food from "./Food";

const GameBoard = ({ snake, food }: { snake: any; food: any }) => (
    <div className="game-board">
        <Snake segments={snake} />
        <Food position={food} />
    </div>
);

export default GameBoard;
