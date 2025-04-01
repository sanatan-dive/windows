"use client";

import { Battery, BellRing, Volume2, Wifi } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Define interfaces for type safety
interface AppIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
}

function Taskbar(): JSX.Element {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isSoundOpen, setIsSoundOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [volume, setVolume] = useState(50);

  // Update time and date every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Event handlers
  const handleMouseEnter = (id: string): void => setHoveredIcon(id);
  const handleMouseLeave = (): void => setHoveredIcon(null);

  // Toggle dialog states with exclusive opening
  const toggleWifi = () => {
    setIsWifiOpen(!isWifiOpen);
    setIsSoundOpen(false); // Close Sound dialog
    setIsTimeOpen(false);  // Close Time dialog
  };

  const toggleSound = () => {
    setIsSoundOpen(!isSoundOpen);
    setIsWifiOpen(false);  // Close WiFi dialog
    setIsTimeOpen(false);  // Close Time dialog
  };

  const toggleTime = () => {
    setIsTimeOpen(!isTimeOpen);
    setIsWifiOpen(false);  // Close WiFi dialog
    setIsSoundOpen(false); // Close Sound dialog
  };

  const appIcons: AppIcon[] = [
    {
      id: "start",
      name: "Start",
      icon: (
        <Image
          src="/menu.png"
          alt="start"
          width={24}
          height={24}
          className="h-full w-full"
        />
      ),
    },
    {
      id: "search",
      name: "Search",
      icon: (
        <Image
          src="/search.png"
          alt="search"
          width={24}
          height={24}
          className="h-6 w-6 rounded"
        />
      ),
    },
    {
      id: "explorer",
      name: "File Explorer",
      icon: (
        <Image
          src="/file.png"
          alt="file"
          width={24}
          height={24}
          className="h-7 w-7"
        />
      ),
    },
    {
      id: "browser",
      name: "Web Browser",
      icon: (
        <Image
          src="/edge.png"
          alt="browser"
          width={24}
          height={24}
          className="h-7 w-7"
        />
      ),
    },
    {
      id: "settings",
      name: "Settings",
      icon: (
        <Image
          src="/settings.png"
          alt="settings"
          width={24}
          height={24}
          className=""
        />
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-50 bg-opacity-80 backdrop-blur-md h-12 flex items-center justify-center shadow-lg">
      {/* App icons container */}
      <div className="flex items-center space-x-1">
        {appIcons.map((app) => (
          <div
            key={app.id}
            className={`relative flex items-center justify-center h-10 w-10 rounded-md mx-0.5 transition-all duration-200 ${
              hoveredIcon === app.id
                ? "bg-white bg-opacity-10"
                : "hover:bg-gray-200 "
            }`}
            onMouseEnter={() => handleMouseEnter(app.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="text-2xl">{app.icon}</div>
            {hoveredIcon === app.id && (
              <div className="absolute bottom-0.5 w-1 h-1 bg-white rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* System tray */}
      <div className="absolute right-0 h-full flex items-center mr-2">
        <div className="flex items-center text-black bg-opacity-20 rounded-md px-2 h-8 space-x-1">
          <button
            className="p-1.5 hover:bg-gray-200 rounded-sm transition-colors"
            onClick={toggleWifi}
          >
            <Wifi size={16} />
          </button>
          <button
            className="p-1.5 hover:bg-gray-200 rounded-sm transition-colors"
            onClick={toggleSound}
          >
            <Volume2 size={16} />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded-sm transition-colors">
            <Battery size={16} />
          </button>
          <div
            className="flex flex-col items-end hover:bg-gray-200 rounded-sm p-1 justify-center px-2 cursor-pointer"
            onClick={toggleTime}
          >
            <span className="font-medium text-xs">{currentTime}</span>
            <span className="text-[10px] opacity-90">{currentDate}</span>
          </div>
        </div>
      </div>

      {/* WiFi Dialog */}
      {isWifiOpen && (
        <div className="absolute bottom-14 right-2 w-64 bg-white text-stone-900 shadow-lg rounded-md p-4">
          <h3 className="text-sm font-semibold mb-2">Network & Internet</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              Wi-Fi 1
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              Wi-Fi 2
            </button>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm text-blue-600">
              Manage known networks
            </button>
          </div>
        </div>
      )}

      {/* Sound Dialog */}
      {isSoundOpen && (
        <div className="absolute bottom-14 right-2 w-64 text-stone-900 bg-white shadow-lg rounded-md p-4">
          <h3 className="text-sm font-semibold mb-2">Sound</h3>
          <div className="flex items-center space-x-2">
            <Volume2 size={16} />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full"
            />
            <span>{volume}%</span>
          </div>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm text-blue-600 mt-2">
            Sound settings
          </button>
        </div>
      )}

      {/* Time/Date Dialog */}
      {isTimeOpen && (
        <div className="absolute bottom-14 right-2 w-80 text-stone-900 bg-white shadow-lg rounded-md p-4">
          <h3 className="text-sm font-semibold mb-2">Date & Time</h3>
          <div className="text-center">
            <div className="text-2xl">{currentTime}</div>
            <div className="text-sm opacity-80">{currentDate}</div>
          </div>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm text-blue-600 mt-2">
            Date and time settings
          </button>
        </div>
      )}
    </div>
  );
}

export default Taskbar;