import { create } from 'zustand';
import { Entity, Frame, Project } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface TacticsState {
    project: Project;
    currentFrameIndex: number;
    isPlaying: boolean;

    // Actions
    addFrame: () => void;
    deleteFrame: (index: number) => void;
    updateEntityPosition: (id: string, x: number, y: number) => void;
    setCurrentFrameIndex: (index: number) => void;
    nextFrame: () => void;
    prevFrame: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
    resetProject: () => void;

    // Export
    isExporting: boolean;
    setIsExporting: (isExporting: boolean) => void;
}

const INITIAL_ENTITIES: Entity[] = [
    { id: 'p1', type: 'player', team: 'home', x: 100, y: 100, number: '1' },
    { id: 'p2', type: 'player', team: 'home', x: 150, y: 150, number: '2' },
    { id: 'p3', type: 'player', team: 'home', x: 200, y: 100, number: '3' },
    { id: 'p4', type: 'player', team: 'home', x: 250, y: 150, number: '4' },
    { id: 'p5', type: 'player', team: 'home', x: 300, y: 100, number: '5' },
    { id: 'e1', type: 'player', team: 'away', x: 600, y: 100, number: '1', color: '#3b82f6' },
    { id: 'e2', type: 'player', team: 'away', x: 550, y: 150, number: '2', color: '#3b82f6' },
    { id: 'e3', type: 'player', team: 'away', x: 500, y: 100, number: '3', color: '#3b82f6' },
    { id: 'e4', type: 'player', team: 'away', x: 450, y: 150, number: '4', color: '#3b82f6' },
    { id: 'e5', type: 'player', team: 'away', x: 400, y: 100, number: '5', color: '#3b82f6' },
    { id: 'b1', type: 'ball', x: 400, y: 250 },
];

const INITIAL_PROJECT: Project = {
    name: 'New Tactic',
    frames: [
        {
            id: 'frame-1',
            entities: JSON.parse(JSON.stringify(INITIAL_ENTITIES)),
        },
    ],
};

export const useTacticsStore = create<TacticsState>((set, get) => ({
    project: INITIAL_PROJECT,
    currentFrameIndex: 0,
    isPlaying: false,
    isExporting: false,

    addFrame: () => {
        const { project, currentFrameIndex } = get();
        const currentFrame = project.frames[currentFrameIndex];

        // Deep copy entities for the new frame
        const newEntities = JSON.parse(JSON.stringify(currentFrame.entities));

        const newFrame: Frame = {
            id: `frame-${Date.now()}`,
            entities: newEntities,
        };

        const newFrames = [...project.frames];
        // Insert after current frame
        newFrames.splice(currentFrameIndex + 1, 0, newFrame);

        set({
            project: { ...project, frames: newFrames },
            currentFrameIndex: currentFrameIndex + 1,
        });
    },

    deleteFrame: (index) => {
        const { project, currentFrameIndex } = get();
        if (project.frames.length <= 1) return; // Don't delete the last frame

        const newFrames = project.frames.filter((_, i) => i !== index);
        let newIndex = currentFrameIndex;
        if (index <= currentFrameIndex && currentFrameIndex > 0) {
            newIndex = currentFrameIndex - 1;
        }

        set({
            project: { ...project, frames: newFrames },
            currentFrameIndex: newIndex,
        });
    },

    updateEntityPosition: (id, x, y) => {
        const { project, currentFrameIndex } = get();
        const newFrames = [...project.frames];
        const currentFrame = newFrames[currentFrameIndex];

        const entityIndex = currentFrame.entities.findIndex((e) => e.id === id);
        if (entityIndex !== -1) {
            currentFrame.entities[entityIndex] = {
                ...currentFrame.entities[entityIndex],
                x,
                y,
            };
            set({ project: { ...project, frames: newFrames } });
        }
    },

    setCurrentFrameIndex: (index) => {
        const { project } = get();
        if (index >= 0 && index < project.frames.length) {
            set({ currentFrameIndex: index });
        }
    },

    nextFrame: () => {
        const { currentFrameIndex, project } = get();
        if (currentFrameIndex < project.frames.length - 1) {
            set({ currentFrameIndex: currentFrameIndex + 1 });
        }
    },

    prevFrame: () => {
        const { currentFrameIndex } = get();
        if (currentFrameIndex > 0) {
            set({ currentFrameIndex: currentFrameIndex - 1 });
        }
    },

    setIsPlaying: (isPlaying) => set({ isPlaying }),

    setIsExporting: (isExporting) => set({ isExporting }),

    resetProject: () => set({ project: INITIAL_PROJECT, currentFrameIndex: 0 }),
}));
