"use client";

import React, { useState, useRef, useEffect } from "react";
import { Folder, File, ChevronLeft, ChevronRight, X, Search, FolderOpen } from "lucide-react";

interface FileExplorerProps {
  onClose: () => void;
}

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  icon: "file" | "folder";
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const files: FileItem[] = [
    { id: "1", name: "Documents", type: "folder", icon: "folder" },
    { id: "2", name: "Pictures", type: "folder", icon: "folder" },
    { id: "3", name: "Report.pdf", type: "file", icon: "file" },
    { id: "4", name: "Notes.txt", type: "file", icon: "file" },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest(".title-bar")) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
    if (isResizing) {
      const newWidth = Math.max(400, size.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(300, size.height + (e.clientY - resizeStart.y));
      setSize({ width: newWidth, height: newHeight });
      setResizeStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart]);

  return (
    <div
      ref={windowRef}
      className="fixed bg-neutral-50 rounded-xl shadow-xl overflow-hidden flex flex-col border border-neutral-200"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000,
      }}
    >
      {/* Title Bar */}
      <div
        className="title-bar h-10 bg-gradient-to-b from-neutral-100 to-neutral-50 flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <FolderOpen size={18} className="text-neutral-700" />
          <span className="text-sm font-medium text-neutral-900">File Explorer</span>
        </div>
        <div className="flex space-x-1">
          <button className="p-1.5 hover:bg-neutral-200 rounded-md transition-colors">
            <span className="text-sm text-neutral-700">🗕</span>
          </button>
          <button className="p-1.5 hover:bg-neutral-200 rounded-md transition-colors">
            <span className="text-sm text-neutral-700">🗗</span>
          </button>
          <button
            className="p-1.5 hover:bg-red-500 hover:text-white rounded-md transition-colors"
            onClick={onClose}
          >
            <X size={16} className="text-neutral-700 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-12 bg-neutral-50 flex items-center px-4 space-x-3 border-b border-neutral-200">
        <button className="p-2 hover:bg-blue-100 rounded-md transition-colors">
          <ChevronLeft size={18} className="text-neutral-600" />
        </button>
        <button className="p-2 hover:bg-blue-100 rounded-md transition-colors">
          <ChevronRight size={18} className="text-neutral-600" />
        </button>
        <div className="flex-1">
          <span className="text-sm text-neutral-600">This PC &gt; Documents</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-3 py-1.5 rounded-md bg-neutral-100 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 bg-blue-50 p-3 border-r border-neutral-200">
          <div className="space-y-1">
            <button className="w-full text-left p-2 hover:bg-blue-100 rounded-md flex items-center space-x-2 transition-colors">
              <Folder size={18} className="text-blue-600" />
              <span className="text-sm text-neutral-900">Quick Access</span>
            </button>
            <button className="w-full text-left p-2 hover:bg-blue-100 rounded-md flex items-center space-x-2 transition-colors">
              <Folder size={18} className="text-blue-600" />
              <span className="text-sm text-neutral-900">This PC</span>
            </button>
            <button className="w-full text-left p-2 hover:bg-blue-100 rounded-md flex items-center space-x-2 transition-colors">
              <Folder size={18} className="text-blue-600" />
              <span className="text-sm text-neutral-900">Documents</span>
            </button>
          </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex flex-col items-center p-3 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
              >
                {file.icon === "folder" ? (
                  <Folder size={48} className="text-blue-500" />
                ) : (
                  <File size={48} className="text-neutral-500" />
                )}
                <span className="text-sm mt-2 text-center text-neutral-900">{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default FileExplorer;