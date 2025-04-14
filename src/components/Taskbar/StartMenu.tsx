"use client";

import React, { useState } from "react";
import {
  User,
  Power,
  Search,
  Mail,
  Calendar,
  Store,
  ImageIcon,
  Settings,
  Chrome,
  FileSpreadsheet,
  FileText,
  Edit3,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const StartMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Added state for control

  const pinnedApps = [
    { id: "edge", name: "Edge", icon: "https://www.google.com/s2/favicons?domain=www.microsoft.com" },
    { id: "explorer", name: "File Explorer", icon: "https://www.google.com/s2/favicons?domain=www.microsoft.com" },
    { id: "store", name: "Store", icon: "https://www.google.com/s2/favicons?domain=www.microsoft.com" },
    { id: "settings", name: "Settings", icon: "https://www.google.com/s2/favicons?domain=www.microsoft.com" },
    { id: "notepad", name: "Notepad", icon: "https://www.google.com/s2/favicons?domain=www.microsoft.com" },
    { id: "paint", name: "Paint", icon: "https://www.google.com/s2/favicons?domain=www.microsoft.com" },
  ];

  const recommended = [
    { id: "doc1", name: "Document1.docx", date: "4/14/2025" },
    { id: "img1", name: "Photo.jpg", date: "4/13/2025" },
    { id: "doc2", name: "Report.pdf", date: "4/12/2025" },
  ];

  return (
    <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-xl rounded-lg mb-2 w-full max-w-2xl mx-auto overflow-hidden z-50">
      {/* Search bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
          <input
            type="text"
            placeholder="Type here to search"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      {/* Pinned section */}
      <div className="px-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium text-sm text-black">Pinned</h2>
          <button className="text-xs flex items-center text-black hover:text-blue-500">
            All apps <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {/* Row 1 */}
          <AppIcon icon={<Mail className="h-6 w-6 text-blue-500" />} name="Mail" />
          <AppIcon icon={<Calendar className="h-6 w-6 text-blue-500" />} name="Calendar" />
          <AppIcon icon={<Store className="h-6 w-6 text-blue-500" />} name="Microsoft Store" />
          <AppIcon icon={<ImageIcon className="h-6 w-6 text-blue-500" />} name="Photos" />
          <AppIcon icon={<Settings className="h-6 w-6 text-black" />} name="Settings" />
          <AppIcon
            icon={<div className="h-6 w-6 flex items-center justify-center text-green-500">♠</div>}
            name="Solitaire"
          />

          {/* Row 2 */}
          <AppIcon
            icon={
              <div className="h-6 w-6 text-blue-500 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center">
                <div className="h-3 w-3 text-white font-bold">e</div>
              </div>
            }
            name="Edge"
          />
          <AppIcon
            icon={
              <div className="h-6 w-6 flex items-center justify-center bg-red-500 text-white rounded-sm">P</div>
            }
            name="PowerPoint"
          />
          <AppIcon
            icon={
              <div className="h-6 w-6 flex items-center justify-center bg-purple-700 text-white rounded-sm">C</div>
            }
            name="Clipchamp"
          />
          <AppIcon
            icon={
              <div className="h-6 w-6 flex items-center justify-center bg-blue-500 text-white rounded-sm">O</div>
            }
            name="Outlook"
          />
          <AppIcon
            icon={<div className="h-6 w-6 flex items-center justify-center bg-blue-400 text-white">✓</div>}
            name="To Do"
          />
          <AppIcon icon={<Chrome className="h-6 w-6 text-blue-500" />} name="Google Chrome" />

          {/* Row 3 */}
          <AppIcon icon={<FileSpreadsheet className="h-6 w-6 text-green-600" />} name="Excel" />
          <AppIcon
            icon={<div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>}
            name="Firefox"
          />
          <AppIcon icon={<Edit3 className="h-6 w-6 text-black" />} name="Photo editor" />
          <AppIcon icon={<FileText className="h-6 w-6 text-blue-600" />} name="Word" />
          <AppIcon
            icon={
              <div className="h-6 w-6 flex items-center justify-center bg-red-500 text-white rounded-sm">O</div>
            }
            name="Office"
          />
          <AppIcon icon={<MessageSquare className="h-6 w-6 text-purple-500" />} name="Messenger" />
        </div>
      </div>

      {/* Recommended section */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium text-sm text-black">Recommended</h2>
          <button className="text-xs flex items-center text-black hover:text-blue-500">
            More <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        </div>

        <div className="space-y-2">
          <RecommendedItem
            icon={
              <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                W
              </div>
            }
            title="Get Started"
            subtitle="Welcome to Windows"
          />

          <RecommendedItem
            icon={<FileText className="h-6 w-6 text-green-600" />}
            title="Article Status"
            subtitle="Aug 25"
          />

          <RecommendedItem
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            title="How to Unlock your Mac with Your..."
            subtitle="Aug 25"
          />

          <RecommendedItem
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            title="REVil ransomware gang may be ba..."
            subtitle="Sep 8"
          />

          <RecommendedItem
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            title="US PC shipments jump by 17 buoye..."
            subtitle="Aug 25"
          />

          <RecommendedItem
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            title="Windows 10 Guide Essential Keybo..."
            subtitle="Aug 25"
          />
        </div>
      </div>

      {/* User profile */}
      <div className="px-4 py-3 mt-2 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-3 text-sm text-black">Sanatan Sharma</span>
        </div>
        <button className="text-black hover:text-blue-500" onClick={onClose}>
          <Power className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

function AppIcon({ icon  , name } : { icon: React.ReactNode; name: string }) {
  return (
    <button className="flex flex-col items-center justify-center space-y-1 hover:bg-gray-100 rounded-md p-2 transition-colors">
      <div className="h-10 w-10 flex items-center justify-center">{icon}</div>
      <span className="text-xs text-center leading-tight text-black">{name}</span>
    </button>
  );
}

function RecommendedItem({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button className="w-full flex items-center space-x-3 hover:bg-gray-100 rounded-md p-2 transition-colors">
      <div className="h-10 w-10 flex items-center justify-center">{icon}</div>
      <div className="text-left">
        <div className="text-sm truncate max-w-[250px] text-black">{title}</div>
        <div className="text-xs text-black">{subtitle}</div>
      </div>
    </button>
  );
}

export default StartMenu;