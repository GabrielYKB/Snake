import React from "react";

const Food = ({ position }: { position: { x: number; y: number } }) => (
    <div
        style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}
        className="food"
    />
);

export default Food;
