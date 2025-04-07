'use client'; // Required for client-side interactivity

import React from 'react';
import Image from 'next/image';

function Chrome() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Chrome Header */}
      <div className="flex items-center bg-gray-100 p-1">
        {/* Tab */}
        <div className="flex items-center bg-white rounded-t-lg px-3 py-2 max-w-xs">
          <Image src="/chrome-favicon.png" alt="Chrome" width={16} height={16} className="mr-2" />
          <span className="text-sm truncate">New Tab</span>
          <button className="ml-2 p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Controls */}
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Address Bar */}
      <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center mr-3 space-x-2">
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex items-center bg-white rounded-full border border-gray-300 px-3 py-1">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="mr-2 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm text-gray-600">Search Google or type a URL</span>
        </div>
        
        <div className="ml-3 flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 bg-white p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Image src="/chrome-logo.png" alt="Google Chrome" width={72} height={72} />
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-1/2">
              <div className="bg-white rounded-full border border-gray-300 px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="mr-3 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-500">Search Google or type a URL</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-4 gap-6">
            {/* Shortcut tiles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-200 mb-3 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">{String.fromCharCode(65 + i)}</span>
                </div>
                <span className="text-xs text-gray-700">Shortcut {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chrome;