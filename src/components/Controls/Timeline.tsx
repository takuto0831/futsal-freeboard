'use client';

import React from 'react';
import { useTacticsStore } from '@/store/tacticsStore';
import { Plus, Trash2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const Timeline = () => {
    const {
        project,
        currentFrameIndex,
        addFrame,
        deleteFrame,
        setCurrentFrameIndex,
        nextFrame,
        prevFrame,
        isPlaying,
        setIsPlaying
    } = useTacticsStore();

    return (
        <div className="flex flex-col gap-4 p-4 bg-white border-t">
            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={prevFrame}
                    className="p-2 rounded-full hover:bg-gray-100"
                    disabled={currentFrameIndex === 0}
                >
                    <SkipBack size={20} />
                </button>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button
                    onClick={nextFrame}
                    className="p-2 rounded-full hover:bg-gray-100"
                    disabled={currentFrameIndex === project.frames.length - 1}
                >
                    <SkipForward size={20} />
                </button>
            </div>

            {/* Frames List */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {project.frames.map((frame, index) => (
                    <div
                        key={frame.id}
                        className={`
              relative flex-shrink-0 w-24 h-16 border-2 rounded cursor-pointer transition-colors
              flex items-center justify-center
              ${index === currentFrameIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}
                        onClick={() => setCurrentFrameIndex(index)}
                    >
                        <span className="text-sm font-medium text-gray-500">Frame {index + 1}</span>

                        {/* Delete Button (only if not the only frame) */}
                        {project.frames.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFrame(index);
                                }}
                                className="absolute top-1 right-1 p-1 text-gray-400 hover:text-red-500 opacity-0 hover:opacity-100 group-hover:opacity-100"
                            >
                                <Trash2 size={12} />
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Frame Button */}
                <button
                    onClick={addFrame}
                    className="flex-shrink-0 w-24 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-blue-400 hover:text-blue-500 text-gray-400"
                >
                    <Plus size={24} />
                </button>
            </div>
        </div>
    );
};

export default Timeline;
