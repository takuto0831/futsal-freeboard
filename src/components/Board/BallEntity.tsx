import React from 'react';
import { Circle, Group } from 'react-konva';
import { Entity } from '@/types';

interface BallEntityProps {
    entity: Entity;
    onDragEnd: (id: string, x: number, y: number) => void;
}

const BallEntity: React.FC<BallEntityProps> = ({ entity, onDragEnd }) => {
    const radius = 8;

    return (
        <Group
            x={entity.x}
            y={entity.y}
            draggable
            onDragEnd={(e) => {
                onDragEnd(entity.id, e.target.x(), e.target.y());
            }}
        >
            <Circle
                radius={radius}
                fill="white"
                stroke="black"
                strokeWidth={1}
                shadowColor="black"
                shadowBlur={2}
                shadowOpacity={0.5}
            />
            {/* Pattern on ball to make it look like a ball */}
            <Circle
                x={0}
                y={0}
                radius={radius / 2}
                fill="black"
                opacity={0.2}
            />
        </Group>
    );
};

export default BallEntity;
