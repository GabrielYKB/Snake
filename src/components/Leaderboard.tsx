// Leaderboard.tsx
import React from "react";

interface LeaderboardProps {
    leaderboardData: { name: string; score: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardData }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {leaderboardData.map((player, index) => (
                    <li key={index}>
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">{player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
