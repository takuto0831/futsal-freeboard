'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import FutsalCourt from './FutsalCourt';
import PlayerEntity from './PlayerEntity';
import BallEntity from './BallEntity';
import { useTacticsStore } from '@/store/tacticsStore';
import { Entity } from '@/types';
import GIF from 'gif.js';

const TacticsBoard = () => {
    const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<any>(null);

    const { project, currentFrameIndex, updateEntityPosition, isPlaying, isExporting, setCurrentFrameIndex, setIsPlaying, setIsExporting } = useTacticsStore((state) => state);

    // Local state for rendering entities (either from store or interpolated)
    const [renderEntities, setRenderEntities] = useState<Entity[]>([]);

    // Animation refs
    const animationRef = useRef<number>();
    const startTimeRef = useRef<number>(0);
    const FRAME_DURATION = 1000; // ms per frame

    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }
    }, []);

    // Sync with store when not playing/exporting
    useEffect(() => {
        if (!isPlaying && !isExporting) {
            const currentFrame = project.frames[currentFrameIndex];
            if (currentFrame) {
                setRenderEntities(currentFrame.entities);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        } else if (isPlaying && !isExporting) {
            // Start playback
            startTimeRef.current = performance.now();
            playAnimation();
        } else if (isExporting) {
            // Start export
            startExport();
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [project, currentFrameIndex, isPlaying, isExporting]);

    const playAnimation = () => {
        const animate = (time: number) => {
            const elapsed = time - startTimeRef.current;
            const totalDuration = (project.frames.length - 1) * FRAME_DURATION;

            if (elapsed >= totalDuration) {
                setIsPlaying(false);
                setCurrentFrameIndex(project.frames.length - 1);
                return;
            }

            updateRenderEntities(elapsed);
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
    };

    const startExport = async () => {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: '/gif.worker.js',
            width: dimensions.width,
            height: dimensions.height,
        });

        const totalDuration = (project.frames.length - 1) * FRAME_DURATION;
        const step = 100; // Capture every 100ms (10fps)
        let elapsed = 0;

        const captureFrame = () => {
            if (elapsed > totalDuration) {
                gif.on('finished', (blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'tactics.gif';
                    a.click();
                    setIsExporting(false);
                });
                gif.render();
                return;
            }

            updateRenderEntities(elapsed);

            // Wait for render
            setTimeout(() => {
                if (stageRef.current) {
                    const dataUrl = stageRef.current.toDataURL({ pixelRatio: 1 });
                    const img = new Image();
                    img.src = dataUrl;
                    img.onload = () => {
                        gif.addFrame(img, { delay: step });
                        elapsed += step;
                        captureFrame();
                    };
                }
            }, 0);
        };

        captureFrame();
    };

    const updateRenderEntities = (elapsed: number) => {
        const currentSequenceIndex = Math.floor(elapsed / FRAME_DURATION);
        const progress = (elapsed % FRAME_DURATION) / FRAME_DURATION;

        const startFrame = project.frames[currentSequenceIndex];
        const endFrame = project.frames[currentSequenceIndex + 1];

        if (startFrame && endFrame) {
            const interpolatedEntities = startFrame.entities.map(startEntity => {
                const endEntity = endFrame.entities.find(e => e.id === startEntity.id);
                if (!endEntity) return startEntity;

                return {
                    ...startEntity,
                    x: startEntity.x + (endEntity.x - startEntity.x) * progress,
                    y: startEntity.y + (endEntity.y - startEntity.y) * progress,
                };
            });
            setRenderEntities(interpolatedEntities);
        } else if (startFrame) {
            setRenderEntities(startFrame.entities);
        }
    };

    const handleDragEnd = (id: string, x: number, y: number) => {
        if (!isPlaying && !isExporting) {
            updateEntityPosition(id, x, y);
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full bg-gray-800">
            <Stage ref={stageRef} width={dimensions.width} height={dimensions.height}>
                <FutsalCourt width={dimensions.width} height={dimensions.height} />
                <Layer>
                    {renderEntities.map((entity) => {
                        if (entity.type === 'player') {
                            return (
                                <PlayerEntity
                                    key={entity.id}
                                    entity={entity}
                                    onDragEnd={handleDragEnd}
                                />
                            );
                        } else if (entity.type === 'ball') {
                            return (
                                <BallEntity
                                    key={entity.id}
                                    entity={entity}
                                    onDragEnd={handleDragEnd}
                                />
                            );
                        }
                        return null;
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

export default TacticsBoard;
