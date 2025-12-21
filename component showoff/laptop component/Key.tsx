import React, { useState } from 'react';
import { KeyProps } from './types';

// RECALCULATED SIZES: Base 1u = 2.75rem (sm:w-11) instead of 3rem
// This creates a ~9% reduction in width, allowing the chassis to fit better.
const getWidthClass = (width: string | undefined): string => {
  switch (width) {
    case '1u': return 'w-9 sm:w-11';
    case '1.25u': return 'w-[2.8125rem] sm:w-[3.4375rem]';
    case '1.5u': return 'w-[3.375rem] sm:w-[4.125rem]';
    case '1.75u': return 'w-[3.9375rem] sm:w-[4.8125rem]';
    case '2u': return 'w-[4.5rem] sm:w-[5.5rem]';
    case '2.25u': return 'w-[5.0625rem] sm:w-[6.1875rem]';
    case '2.75u': return 'w-[6.1875rem] sm:w-[7.5625rem]';
    case '6u': return 'w-56 sm:w-[16.5rem] flex-grow'; // Adjusted spacebar
    case 'auto': return 'flex-grow';
    default: return 'w-9 sm:w-11';
  }
};

export const Key: React.FC<KeyProps> = ({
  label,
  subLabel,
  icon,
  width = '1u',
  type = 'default',
  hasIndicator = false,
  indicatorActive = false,
  height = 'default',
  className = '',
  onClick,
  isPressed = false,
}) => {
  const [pressed, setPressed] = useState(false);

  // Combine external prop control (keyboard shortcuts) with internal mouse interaction
  const visualPressed = pressed || isPressed;

  // Base styles for all keys
  const baseStyles = `
    relative flex flex-col items-center justify-center 
    rounded-md sm:rounded-lg
    transition-all duration-75 ease-out
    select-none cursor-pointer
    group
  `;

  // Height adjustments - Reduced from h-12 to h-11
  const heightClass = height === 'short' ? 'h-7 sm:h-9' : 'h-9 sm:h-11';

  // Material and Color variants
  const colorStyles = type === 'accent' 
    ? `
      bg-accent text-white/95 
      shadow-[0_2px_3px_rgba(180,50,20,0.3),inset_0_1px_0_rgba(255,255,255,0.25)]
      ${visualPressed ? 'shadow-inner bg-accent-hover translate-y-[1px]' : ''}
    ` 
    : `
      bg-keycap text-legend
      shadow-key
      hover:bg-keycap-hover
      ${visualPressed ? 'shadow-key-pressed translate-y-[1px] bg-[#f0f0ec]' : ''}
    `;

  // The "Dish" shape logic
  const dishRadius = width === '1u' || !width ? 'rounded-full' : 'rounded-[0.4rem] sm:rounded-[0.5rem]';

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent double firing on touch devices if needed, but usually handled by React
    if (onClick) {
      onClick();
      // Optional: Add a tiny vibration on mobile for physical feedback
      if (navigator.vibrate) navigator.vibrate(5);
    }
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${getWidthClass(width)}
        ${heightClass}
        ${colorStyles}
        ${className}
      `}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={handleClick}
    >
      {/* 
        Concave Dish / Spherical Depression 
        Refined opacity for HD look
      */}
      {type === 'default' && (
        <div 
          className={`
            absolute inset-[2px] sm:inset-[3px] 
            ${dishRadius}
            dish-gradient
            shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),inset_0_-0.5px_0.5px_rgba(255,255,255,0.6)]
            pointer-events-none
            transition-opacity duration-200
            ${visualPressed ? 'opacity-80' : 'opacity-100'}
          `} 
        />
      )}

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-0.5">
        
        {subLabel ? (
          /* Stacked Layout */
          <div className="flex flex-col items-center justify-center leading-none">
            <span className={`
              text-[0.55rem] sm:text-[0.6rem] font-medium opacity-70 mb-[1px]
              ${type === 'accent' ? 'text-white/80' : ''}
            `}>
              {subLabel}
            </span>
            <span className={`
              text-[0.7rem] sm:text-[0.8rem] font-medium
              ${type === 'accent' ? 'text-white' : ''}
            `}>
              {label}
            </span>
          </div>
        ) : (
          /* Single Label or Icon */
          icon ? (
            <div className="opacity-90 scale-90 sm:scale-100">{icon}</div>
          ) : (
            <span className={`
              text-[0.7rem] sm:text-[0.8rem] font-medium tracking-normal
              ${label && label.length > 1 ? 'lowercase tracking-wide text-[0.6rem] sm:text-[0.65rem] font-semibold' : ''}
              ${type === 'accent' ? 'text-white' : 'text-legend'}
            `}>
              {label}
            </span>
          )
        )}

        {/* Indicator Light (Simulated LED) */}
        {hasIndicator && (
          <div className={`
            absolute left-2.5 top-1/2 -translate-y-1/2
            w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full
            transition-all duration-300
            ${indicatorActive 
              ? 'bg-red-500 shadow-[0_0_4px_1px_rgba(239,68,68,0.6)]' 
              : 'bg-stone-300/50 shadow-[inset_0_0.5px_0.5px_rgba(0,0,0,0.2)]'}
          `} />
        )}
      </div>
    </div>
  );
};
