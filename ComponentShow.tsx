import React, { useState } from 'react';
import ForgotPasswordInteraction from './component showoff/ForgotPassword';
import CassettePlayer from './component showoff/CassettePlayer';
import ReceiptPrinter from './component showoff/ReceiptPrinter';
import SmartUpload from './component showoff/SmartUpload';
import Laptop from './component showoff/laptop component/Laptop';

type ComponentId = 'forgot-password' | 'cassette-player' | 'receipt-printer' | 'smart-upload' | 'laptop';

interface Component {
  id: ComponentId;
  name: string;
  category: string;
  component: React.ReactNode;
}

const ComponentShow: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentId>('forgot-password');
  const [scale, setScale] = useState<number>(1);

  const scaleOptions = [0.5, 0.75, 1];

  const components: Component[] = [
    {
      id: 'forgot-password',
      name: 'Forgot Password',
      category: 'Authentication',
      component: <ForgotPasswordInteraction />,
    },
    {
      id: 'cassette-player',
      name: 'Cassette Player',
      category: 'Media',
      component: <CassettePlayer />,
    },
    {
      id: 'receipt-printer',
      name: 'Receipt Printer',
      category: 'Retail',
      component: <ReceiptPrinter />,
    },
    {
      id: 'smart-upload',
      name: 'Smart Upload',
      category: 'File Management',
      component: <SmartUpload />,
    },
    {
      id: 'laptop',
      name: 'Laptop',
      category: 'Hardware',
      component: <Laptop />,
    },
    // Add more components here as you build them
  ];

  const selected = components.find(c => c.id === selectedComponent);

  return (
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r-2 border-zinc-800 bg-paper dark:bg-paper-dark flex-shrink-0">
        <div className="sticky top-0 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold tracking-tight uppercase text-zinc-900 dark:text-zinc-100">
              Component Library
            </h1>
            <p className="text-xs font-mono text-zinc-500 mt-1">Interactive Showcase</p>
          </div>

          <nav>
            {/* Group by category */}
            {Array.from(new Set(components.map(c => c.category))).map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2 px-2">
                  {category}
                </h3>
                <ul className="space-y-1">
                  {components
                    .filter(c => c.category === category)
                    .map(component => (
                      <li key={component.id}>
                        <button
                          onClick={() => setSelectedComponent(component.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedComponent === component.id
                              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium'
                              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }`}
                        >
                          {component.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-zinc-300 dark:border-zinc-700">
            <p className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider">
              Total Components: {components.length}
            </p>
          </div>
        </div>
      </aside>

      {/* Preview Section */}
      <main className="flex-1 bg-paper dark:bg-paper-dark">
        <div className="p-8 lg:p-12">
          {/* Header */}
          <div className="mb-12 pb-6 border-b-2 border-zinc-800">
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-baseline gap-4">
                <h2 className="text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  {selected?.name}
                </h2>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {selected?.category}
                </span>
              </div>
              
              {/* Scale Controls */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">Scale:</span>
                {scaleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setScale(option)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      scale === option
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {option === 1 ? '100%' : `${option * 100}%`}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">
              Interactive component demonstration
            </p>
          </div>

          {/* Component Preview */}
          <div className={`rounded-lg border-2 border-zinc-300 dark:border-zinc-700 min-h-[500px] flex items-center justify-center overflow-auto ${
            (selectedComponent === 'cassette-player' || selectedComponent === 'receipt-printer' || selectedComponent === 'laptop') ? '' : 'bg-white dark:bg-zinc-900 p-12'
          }`}>
            <div 
              className={(selectedComponent === 'cassette-player' || selectedComponent === 'receipt-printer' || selectedComponent === 'laptop') ? 'w-full' : 'w-full max-w-2xl'}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              {selected?.component}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 border-t border-zinc-300 dark:border-zinc-700">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Component Preview • Interact to see animations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComponentShow;
