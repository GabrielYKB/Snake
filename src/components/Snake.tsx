import React from "react";

const Snake = ({ segments }: { segments: Array<{ x: number; y: number }> }) => (
    <div>
        {segments.map((segment, index) => (
            <div
                key={index}
                style={{
                    left: `${segment.x}px`,
                    top: `${segment.y}px`,
                }}
                className="snake-segment"
            />
        ))}
    </div>
);

export default Snake;
