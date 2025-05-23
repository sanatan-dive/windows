import { Check } from "lucide-react";
import { useState } from "react";


export default function ContextMenu({ x, y }: { x: number; y: number }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div 
      className="absolute z-50"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <div className="relative">
        <div className="bg-white rounded shadow-lg w-64 border border-gray-200">
          <ul className="py-1">
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black" onClick={toggleSubMenu}>
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <span>View</span>
            </li>
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12V5.618a1 1 0 00-1.447-.894L15 7v13l4.553-2.276A1 1 0 0021 16.382V12z" />
                </svg>
              </span>
              <span>Sort by</span>
              <span className="ml-auto">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </li>
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
              <span>Refresh</span>
            </li>
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span>Display settings</span>
            </li>
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <span>Personalize</span>
            </li>
            <li className="h-px bg-gray-200 my-1"></li>
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </span>
              <span>Open in Windows Terminal</span>
              <span className="ml-auto">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </li>
            <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
              <span className="w-6">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <span>Show more options</span>
              <span className="ml-auto text-xs text-gray-500">Shift+F10</span>
            </li>
          </ul>
        </div>
        {isSubMenuOpen && (
          <div className="absolute left-64 top-0 bg-white rounded shadow-lg w-56 border border-gray-200">
            <ul className="py-1">
              <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
                <span className="mr-6 w-4"><Check size={16} /></span>
                <span>Large icons</span>
                <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+1</span>
              </li>
              <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
                <span className="mr-6 w-4"></span>
                <span>Medium icons</span>
                <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+2</span>
              </li>
              <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
                <span className="mr-6 w-4"><Check size={16} /></span>
                <span>Small icons</span>
                <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+3</span>
              </li>
              <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
                <span className="mr-6 w-4"></span>
                <span>Auto arrange icons</span>
              </li>
              <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
                <span className="mr-6 w-4"></span>
                <span>Align icons to grid</span>
              </li>
              <li className="px-3 py-2 hover:bg-blue-100 flex items-center text-sm cursor-pointer text-black">
                <span className="mr-6 w-4"></span>
                <span>Show desktop icons</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}