import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import Leaderboard from "./Leaderboard";
import PostGameScreen from "./PostGameScreen"; // Import the PostGameScreen component
import "../styles.css"; // Import your CSS file

const Game = () => {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [food, setFood] = useState({ x: 100, y: 100 });
    const [direction, setDirection] = useState("RIGHT");
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [scoreSaved, setScoreSaved] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState<
        { name: string; score: number }[]
    >([]);

    // Define an array of colors for the snake
    const snakeColors = [
        "rgb(13, 255, 0)",
        "rgb(0, 255, 0)",
        // Add more colors as needed
    ];

    // Track the current snake color
    const [currentSnakeColor, setCurrentSnakeColor] = useState<string>(
        snakeColors[0]
    );

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
                return;
            }

            // Check for collision with food
            if (newHead.x === food.x && newHead.y === food.y) {
                // Update food position
                setFood(generateRandomFoodPosition(snake));

                // Grow the Snake by adding a new segment
                const newSnake = [...snake, ...[newHead]];
                setSnake(newSnake);

                // Increase the score
                setScore(score + 100);

                // Update the snake's color to the next color in the array
                const nextColorIndex =
                    (snakeColors.indexOf(currentSnakeColor) + 1) %
                    snakeColors.length;
                setCurrentSnakeColor(snakeColors[nextColorIndex]);
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
    }, [
        snake,
        direction,
        isGameStarted,
        isGameOver,
        food,
        score,
        currentSnakeColor,
    ]);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const isCollidingWithSnake = (head: { x: number; y: number }) => {
        // Check if the head collides with any segment (excluding the last segment)
        return snake
            .slice(0, -1)
            .some((segment) => segment.x === head.x && segment.y === head.y);
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
        } while (isCollidingWithSnake(newFoodPosition));

        return newFoodPosition;
    };

    const updateLeaderboard = () => {
        if (score > 0 && playerName.trim() !== "") {
            // Only save the score if playerName is not empty
            const updatedLeaderboard = [
                ...leaderboardData,
                { name: playerName, score },
            ];
            updatedLeaderboard.sort((a, b) => b.score - a.score);
            setLeaderboardData(updatedLeaderboard.slice(0, 10));
            setScoreSaved(true); // Set scoreSaved to true after saving the score
        }
    };

    return (
        <div className="game">
            <h1>Snake Game</h1>
            {!isGameStarted && !isGameOver && (
                <button className="start-button" onClick={startGame}>
                    Start Game
                </button>
            )}
            <div className={`game-container ${isGameOver ? "game-over" : ""}`}>
                <GameBoard
                    snake={snake}
                    food={food}
                    currentSnakeColor={currentSnakeColor}
                />
                <div className={`overlay ${isGameOver ? "visible" : ""}`}>
                    {isGameOver && (
                        <PostGameScreen
                            score={score}
                            playerName={playerName}
                            onSaveScore={updateLeaderboard} // Use updateLeaderboard
                            onTryAgain={() => {
                                setPlayerName(""); // Reset playerName
                                setIsGameOver(false);
                                setIsGameStarted(false);
                                setSnake([{ x: 0, y: 0 }]);
                                setDirection("RIGHT");
                                setScore(0);
                                setFood(generateRandomFoodPosition(snake));
                                setScoreSaved(false); // Reset scoreSaved
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="score">Score: {score}</div>
            <Leaderboard leaderboardData={leaderboardData.slice(0, 10)} />
        </div>
    );
};

export default Game;
