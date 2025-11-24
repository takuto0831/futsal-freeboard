import React from 'react';
import { Circle, Group, Text } from 'react-konva';
import { Entity } from '@/types';

interface PlayerEntityProps {
    entity: Entity;
    onDragEnd: (id: string, x: number, y: number) => void;
}

const PlayerEntity: React.FC<PlayerEntityProps> = ({ entity, onDragEnd }) => {
    const radius = 15;
    const fillColor = entity.team === 'home' ? '#ef4444' : '#3b82f6'; // Red vs Blue
    const strokeColor = 'white';

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
                fill={entity.color || fillColor}
                stroke={strokeColor}
                strokeWidth={2}
                shadowColor="black"
                shadowBlur={5}
                shadowOpacity={0.3}
            />
            <Text
                text={entity.number || ''}
                fontSize={14}
                fontStyle="bold"
                fill="white"
                align="center"
                verticalAlign="middle"
                offsetX={5} // Approximate centering
                offsetY={7}
            />
        </Group>
    );
};

export default PlayerEntity;
