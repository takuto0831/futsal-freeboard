import React from 'react';
import { Layer, Rect, Circle, Line, Group } from 'react-konva';

interface FutsalCourtProps {
    width: number;
    height: number;
}

const FutsalCourt: React.FC<FutsalCourtProps> = ({ width, height }) => {
    const lineColor = "white";
    const lineWidth = 3;
    const courtColor = "#3b82f6"; // Blue court like standard futsal or wood color

    // Standard Futsal dimensions ratio is roughly 2:1 (e.g., 40m x 20m)
    // We will scale to fit the width/height provided, keeping aspect ratio if possible,
    // but for now let's just fill the provided area with a margin.

    const margin = 20;
    const courtWidth = width - margin * 2;
    const courtHeight = height - margin * 2;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 50; // Center circle radius (scaled)

    return (
        <Layer>
            {/* Court Floor */}
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={courtColor}
            />

            {/* Outer Lines */}
            <Rect
                x={margin}
                y={margin}
                width={courtWidth}
                height={courtHeight}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

            {/* Center Line */}
            <Line
                points={[centerX, margin, centerX, height - margin]}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

            {/* Center Circle */}
            <Circle
                x={centerX}
                y={centerY}
                radius={radius}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

            {/* Center Spot */}
            <Circle
                x={centerX}
                y={centerY}
                radius={4}
                fill={lineColor}
            />

            {/* Penalty Areas (Simplified) */}
            {/* Left */}
            <Group>
                <Arc
                    x={margin}
                    y={centerY}
                    radius={100}
                    angle={180}
                    rotation={-90}
                    stroke={lineColor}
                    strokeWidth={lineWidth}
                />
                {/* Penalty Spot */}
                <Circle
                    x={margin + 80}
                    y={centerY}
                    radius={3}
                    fill={lineColor}
                />
            </Group>

            {/* Right */}
            <Group>
                <Arc
                    x={width - margin}
                    y={centerY}
                    radius={100}
                    angle={180}
                    rotation={90}
                    stroke={lineColor}
                    strokeWidth={lineWidth}
                />
                {/* Penalty Spot */}
                <Circle
                    x={width - margin - 80}
                    y={centerY}
                    radius={3}
                    fill={lineColor}
                />
            </Group>

            {/* Goals */}
            <Rect
                x={margin - 10}
                y={centerY - 40}
                width={10}
                height={80}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />
            <Rect
                x={width - margin}
                y={centerY - 40}
                width={10}
                height={80}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

        </Layer>
    );
};

// Helper for Arcs since Konva Arc is a bit specific
import { Arc as KonvaArc } from 'react-konva';

const Arc = (props: any) => {
    return <KonvaArc {...props} />;
}

export default FutsalCourt;
