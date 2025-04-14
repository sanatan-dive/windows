'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Chrome from './Chrome';
import FileExplorer from './Taskbar/FileExplorer'; // Import FileExplorer
import Iframe from './iframe/Iframe';
import ContextMenu from './ContextMenu';



function Hero() {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [showChrome, setShowChrome] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(false); // State for FileExplorer

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleChromeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('Chrome clicked');
    setShowChrome(!showChrome); // Toggle Chrome visibility
    setActiveIcon('chrome');
  };

  const handleFileExplorerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('File Explorer clicked');
    setShowFileExplorer(!showFileExplorer); // Toggle FileExplorer visibility
    setActiveIcon('fileExplorer');
  };

  const handleClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    setActiveIcon(null); // Deactivate all icons on outside click
  };

  const handleIconClick = (iconName: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setActiveIcon(iconName); // Set the clicked icon as active
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className="h-screen w-screen relative overflow-hidden bg-[url('/windows.jpg')] bg-cover"
    >
      {/* Recycle Bin Icon */}
      <div className="absolute top-5 left-5">
        <div
          className={`p-1 rounded-lg backdrop-blur-md transition-all duration-200 ${
            activeIcon === 'bin' ? 'bg-white/20 border-blue-500/80' : ''
          }`}
        >
          <div
            className={`flex flex-col items-center cursor-pointer p-2 rounded transition-colors duration-200 ${
              activeIcon === 'bin' ? '' : 'hover:bg-white/20'
            }`}
            onClick={handleIconClick('bin')}
          >
            <Image
              src="/bin.png"
              alt="Recycle Bin"
              width={50}
              height={50}
            />
            <span className="text-white text-xs mt-1 text-shadow">
              Recycle Bin
            </span>
          </div>
        </div>
      </div>

      {/* Chrome Icon */}
      <div className="absolute top-30 left-5">
        <div
          className={`p-1 rounded-lg backdrop-blur-md transition-all duration-200 ${
            activeIcon === 'chrome' ? 'bg-white/20 border-blue-500/80' : ''
          }`}
        >
          <div
            className={`flex flex-col items-center cursor-pointer p-2 rounded transition-colors duration-200 ${
              activeIcon === 'chrome' ? '' : 'hover:bg-white/20'
            }`}
            onClick={handleChromeClick}
          >
            <Image
              src="/chrome.png"
              alt="Chrome"
              width={50}
              height={50}
            />
            <span className="text-white text-xs mt-1 text-shadow">
              Chrome
            </span>
          </div>
        </div>
      </div>

      {/* File Explorer Icon */}
      <div className="absolute top-55 left-5">
        <div
          className={`p-1 rounded-lg backdrop-blur-md transition-all duration-200 ${
            activeIcon === 'fileExplorer' ? 'bg-white/20 border-blue-500/80' : ''
          }`}
        >
          <div
            className={`flex flex-col items-center cursor-pointer p-2 rounded transition-colors duration-200 ${
              activeIcon === 'fileExplorer' ? '' : 'hover:bg-white/20'
            }`}
            onClick={handleFileExplorerClick}
          >
            <Image
              src="/file.png"
              alt="File Explorer"
              width={50}
              height={50}
            />
            <span className="text-white text-xs mt-1 text-shadow">
              File Explorer
            </span>
          </div>
        </div>
      </div>

      {/* Render Chrome */}
      {showChrome && <Chrome />}

      {/* Render File Explorer */}
      {showFileExplorer && <FileExplorer onClose={() => setShowFileExplorer(false)} />}

      {/* Context Menu */}
      {contextMenu.visible && <ContextMenu x={contextMenu.x} y={contextMenu.y} />}
    </div>
  );
}

export default Hero;