import React, { useEffect, useState } from 'react';

interface CodeStreamProps {
  isDone: boolean;
}

const CodeStream: React.FC<CodeStreamProps> = ({ isDone }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (isDone) {
      setLines([
        '> ACCESS GRANTED',
        '> DECRYPTION COMPLETE',
        '> KEY: 0xA7F2B9C4D1E8',
      ]);
      return;
    }

    const codeSnippets = [
      '> Scanning security layers...',
      '> Breaking RSA-2048 encryption...',
      '> Analyzing byte patterns...',
      '> Injecting payload 0xDEADBEEF...',
      '> Bypassing firewall rules...',
      '> Extracting private keys...',
      '> Decoding authentication tokens...',
    ];

    let index = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev, codeSnippets[index % codeSnippets.length]];
        return newLines.slice(-3); // Keep only last 3 lines
      });
      index++;
    }, 300);

    return () => clearInterval(interval);
  }, [isDone]);

  return (
    <div className="h-full flex flex-col justify-end gap-0.5">
      {lines.map((line, i) => (
        <div
          key={`${line}-${i}`}
          className={`${
            isDone
              ? 'text-emerald-400'
              : 'text-neutral-500'
          } leading-tight`}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default CodeStream;
