import React from "react";

interface GameBoardProps {
    snake: Array<{ x: number; y: number }>;
    food: { x: number; y: number };
    currentSnakeColor: string; // Pass the current snake color as a prop
}

const GameBoard: React.FC<GameBoardProps> = ({
    snake,
    food,
    currentSnakeColor,
}) => {
    return (
        <div className="game-board">
            {snake.map((segment, index) => (
                <div
                    className="snake-segment"
                    key={index}
                    style={{
                        left: `${segment.x}px`,
                        top: `${segment.y}px`,
                        backgroundColor: currentSnakeColor, // Use the current color
                        width: "10px",
                        height: "10px",
                        border: "1px solid #000",
                        // Add other styling as needed
                    }}
                ></div>
            ))}
            <div
                className="food"
                style={{
                    left: `${food.x}px`,
                    top: `${food.y}px`,
                    backgroundColor: "red", // You can style the food differently
                    width: "10px",
                    height: "10px",
                    // Add other styling as needed
                }}
            ></div>
        </div>
    );
};

export default GameBoard;
