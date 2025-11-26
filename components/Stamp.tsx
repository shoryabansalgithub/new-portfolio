import React from 'react';

interface StampProps {
  text?: string;
  className?: string;
}

const Stamp: React.FC<StampProps> = ({ text = "OPEN TO WORK", className = "" }) => {
  return (
    <div className={`
      select-none
      inline-flex items-center justify-center
      px-2 py-1 sm:px-3 sm:py-1.5
      border-[3px] border-double
      rounded-sm
      rotate-[-12deg]
      hover:rotate-0 hover:scale-110 transition-transform duration-300
      bg-transparent
      text-green-700 border-green-700
      dark:text-green-400 dark:border-green-400
      opacity-80
      ${className}
    `}>
      <span className="font-mono text-[8px] sm:text-[10px] font-bold uppercase tracking-widest leading-none whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};

export default Stamp;