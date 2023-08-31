import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import Leaderboard from "./Leaderboard";

const Game = () => {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [food, setFood] = useState({ x: 100, y: 100 });
    const [direction, setDirection] = useState("RIGHT");
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [leaderboardData, setLeaderboardData] = useState<
        { name: string; score: number }[]
    >([]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isGameStarted) {
                return; // Prevent moving until the game is started
            }

            if (isGameOver) {
                return; // Prevent moving when the game is over
            }

            switch (event.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") setDirection("UP");
                    break;
                case "ArrowDown":
                    if (direction !== "UP") setDirection("DOWN");
                    break;
                case "ArrowLeft":
                    if (direction !== "RIGHT") setDirection("LEFT");
                    break;
                case "ArrowRight":
                    if (direction !== "LEFT") setDirection("RIGHT");
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isGameStarted, isGameOver, direction]);

    useEffect(() => {
        if (!isGameStarted || isGameOver) {
            return; // Do nothing if the game is not started or is over
        }

        const gameInterval = setInterval(() => {
            const newHead = { ...snake[0] };

            switch (direction) {
                case "UP":
                    newHead.y -= 10;
                    break;
                case "DOWN":
                    newHead.y += 10;
                    break;
                case "LEFT":
                    newHead.x -= 10;
                    break;
                case "RIGHT":
                    newHead.x += 10;
                    break;
                default:
                    break;
            }

            // Check for collision with walls or itself
            if (
                newHead.x < 0 ||
                newHead.x >= 300 ||
                newHead.y < 0 ||
                newHead.y >= 300 ||
                isCollidingWithSnake(newHead)
            ) {
                clearInterval(gameInterval);
                setIsGameOver(true);
                updateLeaderboard(); // Update the leaderboard with the current score
                setTimeout(() => {
                    setIsGameOver(false);
                    setSnake([{ x: 0, y: 0 }]);
                    setDirection("RIGHT");
                    setScore(0);
                    setFood(generateRandomFoodPosition(snake)); // Reset food position
                }, 1000); // Reset the game after 1 second
                return;
            }

            // Check for collision with food
            if (newHead.x === food.x && newHead.y === food.y) {
                // Update food position
                setFood(generateRandomFoodPosition(snake));

                // Grow the Snake by adding a new segment
                const newSnake = [...snake, newHead];
                setSnake(newSnake);

                // Increase the score
                setScore(score + 100);
            } else {
                // Remove the tail segment
                const newSnake = [...snake];
                newSnake.pop();
                setSnake([newHead, ...newSnake]);
            }
        }, 100);

        return () => {
            clearInterval(gameInterval);
        };
    }, [snake, direction, isGameStarted, isGameOver, food, score]);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const isCollidingWithSnake = (head: { x: number; y: number }) => {
        // Check if the head collides with any segment
        return snake.some(
            (segment) => segment.x === head.x && segment.y === head.y
        );
    };

    const generateRandomFoodPosition = (
        snakeSegments: Array<{ x: number; y: number }>
    ) => {
        let newFoodPosition;
        do {
            newFoodPosition = {
                x: Math.floor(Math.random() * 30) * 10,
                y: Math.floor(Math.random() * 30) * 10,
            };
        } while (
            isCollidingWithSnake(newFoodPosition) ||
            isSamePosition(newFoodPosition, food)
        );

        return newFoodPosition;
    };

    const isSamePosition = (
        pos1: { x: number; y: number },
        pos2: { x: number; y: number }
    ) => {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    };

    const updateLeaderboard = () => {
        if (score > 0) {
            setLeaderboardData((prevData) => [
                ...prevData,
                { name: "Player", score }, // You can replace 'Player' with actual names
            ]);
        }
    };

    const topPlayers = leaderboardData
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    return (
        <div className="game">
            <h1>Snake Game</h1>
            {!isGameStarted && !isGameOver && (
                <button className="start-button" onClick={startGame}>
                    Start Game
                </button>
            )}
            {isGameOver && <div className="game-over">Game Over</div>}
            <div className="score">Score: {score}</div>
            <GameBoard snake={snake} food={food} />
            <Leaderboard leaderboardData={topPlayers} />
        </div>
    );
};

export default Game;