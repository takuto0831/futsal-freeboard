'use client';

import React, { useRef } from 'react';
import { useTacticsStore } from '@/store/tacticsStore';
import { saveProject, loadProject } from '@/utils/fileStorage';
import { Save, Upload, Download, FileJson } from 'lucide-react';

const Toolbar = () => {
    const { project, setIsExporting, isExporting } = useTacticsStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        saveProject(project);
    };

    const handleLoadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await loadProject(file);
            } catch (error) {
                console.error("Failed to load project:", error);
                alert("Failed to load project file.");
            }
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="p-4 bg-white border-b flex items-center gap-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700"
                >
                    <Save size={16} />
                    Save Project
                </button>

                <button
                    onClick={handleLoadClick}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700"
                >
                    <Upload size={16} />
                    Load Project
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    className="hidden"
                />
            </div>

            <div className="h-6 w-px bg-gray-300 mx-2" />

            {/* GIF Export */}
            <button
                className="flex items-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-sm font-medium disabled:opacity-50"
                onClick={() => setIsExporting(true)}
                disabled={isExporting}
            >
                <Download size={16} />
                {isExporting ? 'Generating...' : 'Export GIF'}
            </button>
        </div>
    );
};

export default Toolbar;
