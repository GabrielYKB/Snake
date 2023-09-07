// PostGameScreen.tsx

import React, { useState } from "react";

interface PostGameScreenProps {
    score: number;
    onTryAgain: () => void;
    onSaveScore: (name: string) => void;
}

const PostGameScreen: React.FC<PostGameScreenProps> = ({
    score,
    onTryAgain,
    onSaveScore,
}) => {
    const [playerName, setPlayerName] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value);
    };

    const handleSaveScore = () => {
        onSaveScore(playerName);
    };

    return (
        <div className="post-game-screen">
            <h2>Game Over</h2>
            <p>Your Score: {score}</p>
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={handleNameChange}
            />
            <button onClick={handleSaveScore}>Save Score</button>
            <button onClick={onTryAgain}>Try Again</button>
        </div>
    );
};

export default PostGameScreen;
