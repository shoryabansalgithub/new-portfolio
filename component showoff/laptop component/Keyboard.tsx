import React from 'react';
import { Key } from './Key';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Command } from 'lucide-react';

const Row: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between gap-1 sm:gap-1.5 w-full ${className}`}>
    {children}
  </div>
);

interface KeyboardProps {
  onKey?: (key: string) => void;
  activeCodes?: string[];
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKey, activeCodes = [] }) => {
  const handlePress = (k: string) => {
    if (onKey) onKey(k);
  };

  const isPressed = (code: string) => activeCodes.includes(code);

  return (
    <div className="
      w-full max-w-[50rem] 
      bg-keybed 
      rounded-[1.25rem] 
      p-2 sm:p-4 
      shadow-keybed
      flex flex-col gap-1 sm:gap-1.5
    ">
      
      {/* Row 1: Function Row */}
      <Row className="mb-1.5 sm:mb-3">
        <Key code="Escape" label="esc" width="1u" height="short" onClick={() => handlePress('ESC')} isPressed={isPressed('Escape')} />
        <div className="flex gap-1 sm:gap-1.5 flex-grow justify-center">
            {['f1', 'f2', 'f3', 'f4'].map(k => <Key key={k} code={k.toUpperCase()} label={k} width="1u" height="short" onClick={() => handlePress(k)} isPressed={isPressed(k.toUpperCase()) || isPressed(`F${k.substring(1)}`)} />)}
            <div className="w-2 sm:w-3" /> {/* Spacer */}
            {['f5', 'f6', 'f7', 'f8'].map(k => <Key key={k} code={k.toUpperCase()} label={k} width="1u" height="short" onClick={() => handlePress(k)} isPressed={isPressed(`F${k.substring(1)}`)} />)}
            <div className="w-2 sm:w-3" /> {/* Spacer */}
            {['f9', 'f10', 'f11', 'f12'].map(k => <Key key={k} code={k.toUpperCase()} label={k} width="1u" height="short" onClick={() => handlePress(k)} isPressed={isPressed(`F${k.substring(1)}`)} />)}
        </div>
        <Key code="Delete" label="del" width="1u" height="short" onClick={() => handlePress('DELETE')} isPressed={isPressed('Delete')} />
      </Row>

      {/* Row 2: Numbers */}
      <Row>
        <Key code="Backquote" label="`" subLabel="~" width="1u" onClick={() => handlePress('`')} isPressed={isPressed('Backquote')} />
        <Key code="Digit1" label="1" subLabel="!" width="1u" onClick={() => handlePress('1')} isPressed={isPressed('Digit1')} />
        <Key code="Digit2" label="2" subLabel="@" width="1u" onClick={() => handlePress('2')} isPressed={isPressed('Digit2')} />
        <Key code="Digit3" label="3" subLabel="#" width="1u" onClick={() => handlePress('3')} isPressed={isPressed('Digit3')} />
        <Key code="Digit4" label="4" subLabel="$" width="1u" onClick={() => handlePress('4')} isPressed={isPressed('Digit4')} />
        <Key code="Digit5" label="5" subLabel="%" width="1u" onClick={() => handlePress('5')} isPressed={isPressed('Digit5')} />
        <Key code="Digit6" label="6" subLabel="^" width="1u" onClick={() => handlePress('6')} isPressed={isPressed('Digit6')} />
        <Key code="Digit7" label="7" subLabel="&" width="1u" onClick={() => handlePress('7')} isPressed={isPressed('Digit7')} />
        <Key code="Digit8" label="8" subLabel="*" width="1u" onClick={() => handlePress('8')} isPressed={isPressed('Digit8')} />
        <Key code="Digit9" label="9" subLabel="(" width="1u" onClick={() => handlePress('9')} isPressed={isPressed('Digit9')} />
        <Key code="Digit0" label="0" subLabel=")" width="1u" onClick={() => handlePress('0')} isPressed={isPressed('Digit0')} />
        <Key code="Minus" label="-" subLabel="_" width="1u" onClick={() => handlePress('-')} isPressed={isPressed('Minus')} />
        <Key code="Equal" label="=" subLabel="+" width="1u" onClick={() => handlePress('=')} isPressed={isPressed('Equal')} />
        <Key code="Backspace" label="backspace" width="1.5u" type="action" onClick={() => handlePress('BACKSPACE')} isPressed={isPressed('Backspace')} />
        <Key code="Home" label="home" width="1u" onClick={() => handlePress('HOME')} isPressed={isPressed('Home')} />
      </Row>

      {/* Row 3: Tab/QWERTY */}
      <Row>
        <Key code="Tab" label="tab" width="1.5u" type="action" onClick={() => handlePress('TAB')} isPressed={isPressed('Tab')} />
        {'QWERTYUIOP'.split('').map(char => (
          <Key key={char} code={`Key${char}`} label={char} width="1u" onClick={() => handlePress(char)} isPressed={isPressed(`Key${char}`)} />
        ))}
        <Key code="BracketLeft" label="[" subLabel="{" width="1u" onClick={() => handlePress('[')} isPressed={isPressed('BracketLeft')} />
        <Key code="BracketRight" label="]" subLabel="}" width="1u" onClick={() => handlePress(']')} isPressed={isPressed('BracketRight')} />
        <Key code="Backslash" label="\" subLabel="|" width="1u" onClick={() => handlePress('\\')} isPressed={isPressed('Backslash')} />
        <Key code="PageUp" label="pg up" width="1u" onClick={() => handlePress('PAGE_UP')} isPressed={isPressed('PageUp')} />
      </Row>

      {/* Row 4: Caps/ASDF */}
      <Row>
        <Key code="CapsLock" label="caps lock" width="1.75u" type="action" onClick={() => handlePress('CAPS')} isPressed={isPressed('CapsLock')} />
        {'ASDFGHJKL'.split('').map(char => (
          <Key key={char} code={`Key${char}`} label={char} width="1u" onClick={() => handlePress(char)} isPressed={isPressed(`Key${char}`)} />
        ))}
        <Key code="Semicolon" label=";" subLabel=":" width="1u" onClick={() => handlePress(';')} isPressed={isPressed('Semicolon')} />
        <Key code="Quote" label="'" subLabel='"' width="1u" onClick={() => handlePress("'")} isPressed={isPressed('Quote')} />
        <Key code="Enter" label="enter" width="2.25u" type="action" onClick={() => handlePress('ENTER')} isPressed={isPressed('Enter')} />
        <Key code="PageDown" label="pg dn" width="1u" onClick={() => handlePress('PAGE_DOWN')} isPressed={isPressed('PageDown')} />
      </Row>

      {/* Row 5: Shift/ZXCV */}
      <Row>
        <Key code="ShiftLeft" label="shift" width="2.25u" type="action" onClick={() => handlePress('SHIFT')} isPressed={isPressed('ShiftLeft')} />
        {'ZXCVBNM'.split('').map(char => (
          <Key key={char} code={`Key${char}`} label={char} width="1u" onClick={() => handlePress(char)} isPressed={isPressed(`Key${char}`)} />
        ))}
        <Key code="Comma" label="," subLabel="<" width="1u" onClick={() => handlePress(',')} isPressed={isPressed('Comma')} />
        <Key code="Period" label="." subLabel=">" width="1u" onClick={() => handlePress('.')} isPressed={isPressed('Period')} />
        <Key code="Slash" label="/" subLabel="?" width="1u" onClick={() => handlePress('/')} isPressed={isPressed('Slash')} />
        <Key code="ShiftRight" label="shift" width="1.75u" type="action" onClick={() => handlePress('SHIFT')} isPressed={isPressed('ShiftRight')} />
        <Key code="End" label="end" width="1u" onClick={() => handlePress('END')} isPressed={isPressed('End')} />
      </Row>

      {/* Row 6: Mods/Space/Arrows */}
      <Row>
        <Key code="ControlLeft" label="ctrl" width="1.25u" type="action" onClick={() => handlePress('CTRL')} isPressed={isPressed('ControlLeft')} />
        <Key label="fn" width="1.25u" type="action" hasIndicator={true} indicatorActive={true} onClick={() => handlePress('FN')} />
        <Key code="MetaLeft" icon={<Command size={15} />} label="cmd" width="1.25u" type="action" onClick={() => handlePress('CMD')} isPressed={isPressed('MetaLeft')} />
        <Key code="AltLeft" label="alt" width="1.25u" type="action" onClick={() => handlePress('ALT')} isPressed={isPressed('AltLeft')} />
        <Key code="Space" width="6u" onClick={() => handlePress('SPACE')} isPressed={isPressed('Space')} /> {/* Spacebar */}
        <Key code="AltRight" label="alt" width="1.25u" type="action" onClick={() => handlePress('ALT')} isPressed={isPressed('AltRight')} />
        <Key code="ControlRight" label="ctrl" width="1.25u" type="action" onClick={() => handlePress('CTRL')} isPressed={isPressed('ControlRight')} />
        
        {/* Arrow Cluster */}
        <div className="flex gap-1 sm:gap-1.5">
            <Key code="ArrowLeft" icon={<ArrowLeft size={15} />} width="1u" type="accent" onClick={() => handlePress('LEFT')} isPressed={isPressed('ArrowLeft')} />
            <div className="flex flex-col gap-1 sm:gap-1.5">
                <Key code="ArrowUp" icon={<ArrowUp size={15} />} width="1u" type="accent" height="short" className="h-[1.05rem] sm:h-[1.25rem]" onClick={() => handlePress('UP')} isPressed={isPressed('ArrowUp')} />
                <Key code="ArrowDown" icon={<ArrowDown size={15} />} width="1u" type="accent" height="short" className="h-[1.05rem] sm:h-[1.25rem]" onClick={() => handlePress('DOWN')} isPressed={isPressed('ArrowDown')} />
            </div>
            <Key code="ArrowRight" icon={<ArrowRight size={15} />} width="1u" type="accent" onClick={() => handlePress('RIGHT')} isPressed={isPressed('ArrowRight')} />
        </div>
      </Row>
    </div>
  );
};
