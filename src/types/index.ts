export type EntityType = 'player' | 'ball';
export type Team = 'home' | 'away';

export interface Entity {
    id: string;
    type: EntityType;
    team?: Team;
    x: number;
    y: number;
    number?: string; // Jersey number
    color?: string;
}

export interface Frame {
    id: string;
    entities: Entity[];
}

export interface Project {
    name: string;
    frames: Frame[];
}
