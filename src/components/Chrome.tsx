"use client"; // Required for client-side interactivity

import React, { useState, useRef, useEffect } from "react";
import Iframe from "./iframe/Iframe";

interface Tab {
  id: number;
  title: string;
  url: string;
  isLoading: boolean;
}

function Chrome() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 1,
      title: "Google Search",
      url: "https://www.google.com/webhp?igu=1",
      isLoading: true,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Add a new tab
  const addNewTab = () => {
    const newTabId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
    const newTab: Tab = {
      id: newTabId,
      title: "New Tab",
      url: "https://www.google.com/webhp?igu=2",
      isLoading: true,
    };
    console.log("Adding new tab:", newTab);
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
  };

  // Close a tab
  const closeTab = (tabId: number) => {
    console.log("Closing tab:", tabId);
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId && newTabs.length) {
      setActiveTabId(newTabs[0].id);
    } else if (!newTabs.length) {
      setIsOpen(false);
    }
  };

  // Switch to a specific tab
  const switchTab = (tabId: number) => {
    console.log("Switching to tab:", tabId);
    setActiveTabId(tabId);
  };

  // Handle iframe load completion for a specific tab
  const handleIframeLoad = (tabId: number) => {
    console.log("Iframe loaded for tab:", tabId);
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === tabId ? { ...tab, isLoading: false } : tab))
    );
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest(".title-bar") && !isMaximized) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  // Handle resize start
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isMaximized) {
      setIsResizing(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setResizeStart({
          x: e.clientX,
          y: e.clientY,
          width: rect.width,
          height: rect.height,
        });
      }
      e.preventDefault();
    }
  };

  // Handle drag and resize movement
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
    if (isResizing && !isMaximized) {
      const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  // Handle drag and resize end
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Add transition for smoother visual feedback
  useEffect(() => {
    const element = windowRef.current;
    if (element) {
      element.style.transition = isDragging || isResizing ? "none" : "all 0.2s ease";
    }
  }, [isDragging, isResizing]);

  // Event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  // If closed, return null
  if (!isOpen) return null;

  // If minimized, render only a minimal placeholder
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Restore Chrome
      </button>
    );
  }

  // Get the active tab
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  console.log("Active tab:", activeTab);

  return (
    <div
      ref={windowRef}
      className="absolute bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
      style={{
        width: isMaximized ? "100%" : `${size.width}px`,
        height: isMaximized ? "100%" : `${size.height}px`,
        maxWidth: isMaximized ? "none" : "95%",
        maxHeight: isMaximized ? "none" : "95%",
        top: isMaximized ? 0 : `${position.y}px`,
        left: isMaximized ? 0 : `${position.x}px`,
        borderRadius: isMaximized ? 0 : "8px",
        border: "1px solid #e5e7eb",
        transition: isDragging || isResizing ? "none" : "all 0.2s ease",
      }}
    >
      {/* Windows 11-style window header */}
      <div
        className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-200 title-bar cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex-1 flex items-center">
          {/* Tab Bar */}
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`relative px-4 py-2 mr-1 rounded-t-md cursor-pointer flex items-center ${
                activeTabId === tab.id
                  ? "bg-white border-t border-l border-r border-gray-200"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => switchTab(tab.id)}
            >
              <span className="text-sm truncate max-w-[150px]">{tab.title}</span>
              <button
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
          {/* New Tab Button */}
          <button
            onClick={addNewTab}
            className="ml-2 px-2 py-1 text-gray-900 hover:bg-gray-200 rounded-md"
            title="New Tab"
          >
            +
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {/* Window control buttons */}
          <button
            onClick={() => setIsMinimized(true)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            title="Minimize"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12h18v2H3z" />
            </svg>
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              {isMaximized ? (
              <path d="M3 5h14v10H5v4h16V5h-4V3H5v-2v2H3v14h2V9h10V5H5V3H3z" />
              ) : (
                <path d="M3 5v14h18V5H3zm2 2h14v10H5V7z" />
              )}
            </svg>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white rounded-md transition-colors"
            title="Close"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content area with skeleton loader */}
      <div className="w-full h-[calc(100%-44px)] relative">
        {!activeTab ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No active tab
          </div>
        ) : (
          <>
            {activeTab.isLoading && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse">
                <div className="h-12 bg-gray-200 m-4 rounded" />
                <div className="h-8 bg-gray-200 mx-4 my-2 rounded w-1/2" />
                <div className="h-8 bg-gray-200 mx-4 my-2 rounded w-1/3" />
                <div className="space-y-2 mt-4 px-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            )}
            <Iframe
              iframeSrc={activeTab.url}
              iframeSize={{ width: "100%", height: "100%" }}
              title={activeTab.title}
              style={{
                border: "none",
                display: activeTab.isLoading ? "none" : "block",
              }}
              onLoad={() => handleIframeLoad(activeTab.id)}
            />
          </>
        )}
        {/* Resize Handle */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize bg-transparent hover:bg-gray-300 transition-colors"
          onMouseDown={handleResizeMouseDown}
        />
      </div>
    </div>
  );
}

export default Chrome;