'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Timeline from '@/components/Controls/Timeline';
import Toolbar from '@/components/Controls/Toolbar';

const TacticsBoard = dynamic(() => import("@/components/Board/TacticsBoard"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-200">Loading Board...</div>,
});

const FutsalBoardApp = () => {
    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Sidebar for Controls */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <Toolbar />
                <div className="p-4 text-sm text-gray-500">
                    Drag players and ball to position them. Add frames to create animation.
                </div>
            </aside>

            {/* Main Board Area */}
            <section className="flex-1 bg-gray-200 flex flex-col">
                <div className="flex-1 flex items-center justify-center relative p-8">
                    <div className="w-[800px] h-[500px] bg-white shadow-xl rounded-lg overflow-hidden">
                        <TacticsBoard />
                    </div>
                </div>

                {/* Timeline */}
                <div className="h-48 bg-white border-t z-10">
                    <Timeline />
                </div>
            </section>
        </div>
    );
};

export default FutsalBoardApp;
