import React from 'react';

interface TrackpadProps {
  onMove?: (dx: number, dy: number) => void;
}

export const Trackpad: React.FC<TrackpadProps> = ({ onMove }) => {
  const handleMouseMove = (e: React.MouseEvent) => {
    if (onMove) {
      // Use movementX/Y for relative deltas.
      // This works best when pointer is locked, but for this simulation:
      // We accept that "hovering" over the trackpad moves the cursor.
      onMove(e.movementX, e.movementY);
    }
  };

  return (
    <div className="w-full h-24 sm:h-32 mt-5 sm:mt-5 px-8 sm:px-12 flex justify-center">
      <div 
        className="
          w-full max-w-xl h-full
          bg-keybed
          rounded-xl
          shadow-trackpad
          transition-colors duration-300
          flex items-center justify-center
          cursor-crosshair
        "
        onMouseMove={handleMouseMove}
      >
        {/* Trackpad surface is intentionally blank and matte */}
      </div>
    </div>
  );
};
