import React, { useState } from "react";

interface PostGameScreenProps {
    score: number;
    playerName: string;
    onTryAgain: () => void;
    onSaveScore: (name: string) => void;
}

const PostGameScreen: React.FC<PostGameScreenProps> = ({
    score,
    playerName,
    onTryAgain,
    onSaveScore,
}) => {
    const [inputName, setInputName] = useState(playerName);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(e.target.value);
    };

    const handleSaveScore = () => {
        onSaveScore(inputName);
    };

    return (
        <div className="post-game-screen">
            <h2>Game Over</h2>
            <p>Your Score: {score}</p>
            <input
                type="text"
                placeholder="Enter your name"
                value={inputName}
                onChange={handleNameChange}
            />
            <button onClick={handleSaveScore}>Save Score</button>
            <button onClick={onTryAgain}>Try Again</button>
        </div>
    );
};

export default PostGameScreen;
