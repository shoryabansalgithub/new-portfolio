import React from 'react';
import { ArrowRight } from 'lucide-react';
import ForgotPasswordInteraction from '../component showoff/ForgotPassword';
import CassettePlayer from '../component showoff/CassettePlayer';
import SmartUpload from '../component showoff/SmartUpload';

interface ComponentsPreviewProps {
  onNavigate: () => void;
}

const ComponentsPreview: React.FC<ComponentsPreviewProps> = ({ onNavigate }) => {
  return (
    <div className="-mx-4 sm:-mx-8">
      {/* Header Section */}
      <h2 className="font-serif font-bold text-2xl mb-[24.5px] border-b pb-2 px-4 sm:px-8 transition-colors duration-300 text-zinc-900 border-zinc-300 dark:text-zinc-100 dark:border-zinc-800">
        <div className="flex items-baseline justify-between">
          <span>Component Showcase</span>
          <button
            onClick={onNavigate}
            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5 group transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </h2>

      {/* Component Previews */}
      <div className="px-4 sm:px-8">
        <div
          onClick={onNavigate}
          className="relative group cursor-pointer border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300"
        >
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-zinc-300 dark:divide-zinc-800">

            {/* Forgot Password Preview */}
            <div className="relative aspect-square overflow-hidden bg-paper dark:bg-paper-dark">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="scale-[0.4] origin-center pointer-events-none">
                  <ForgotPasswordInteraction />
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 backdrop-blur-sm border-b border-zinc-300 dark:border-zinc-800 px-3 py-2 bg-paper/80 dark:bg-paper-dark/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400">AUTHENTICATION</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm border-t border-zinc-300 dark:border-zinc-800 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/95 dark:bg-paper-dark/95">
                <p className="text-[9px] font-mono text-zinc-500 dark:text-zinc-500">Decryption modal with code stream</p>
              </div>
            </div>

            {/* Cassette Player Preview */}
            <div className="relative aspect-square overflow-hidden bg-paper dark:bg-paper-dark">
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <div className="scale-[0.18] origin-center pointer-events-none">
                  <CassettePlayer />
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 backdrop-blur-sm border-b border-zinc-300 dark:border-zinc-800 px-3 py-2 bg-paper/80 dark:bg-paper-dark/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400">MEDIA PLAYER</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm border-t border-zinc-300 dark:border-zinc-800 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/95 dark:bg-paper-dark/95">
                <p className="text-[9px] font-mono text-zinc-500 dark:text-zinc-500">Retro cassette with spinning reels</p>
              </div>
            </div>

            {/* Smart Upload Preview */}
            <div className="relative aspect-square overflow-hidden bg-paper dark:bg-paper-dark">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="scale-[0.5] origin-center pointer-events-none">
                  <SmartUpload />
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 backdrop-blur-sm border-b border-zinc-300 dark:border-zinc-800 px-3 py-2 bg-paper/80 dark:bg-paper-dark/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400">FILE UPLOAD</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm border-t border-zinc-300 dark:border-zinc-800 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-paper/95 dark:bg-paper-dark/95">
                <p className="text-[9px] font-mono text-zinc-500 dark:text-zinc-500">Smart upload with multi-stage flow</p>
              </div>
            </div>
          </div>

          {/* Footer Info Bar */}
          <div className="border-t border-zinc-300 dark:border-zinc-800 bg-paper dark:bg-paper-dark px-4 py-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-500">
                <span className="font-mono">5 Components</span>
                <span>•</span>
                <span className="font-mono">5 Categories</span>
                <span>•</span>
                <span className="font-mono">Fully Animated</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors font-medium">
                <span>Explore Library</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPreview;
