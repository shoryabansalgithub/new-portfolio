import { ReactNode } from 'react';

export interface KeyProps {
  label?: string;
  subLabel?: string;
  icon?: ReactNode;
  width?: string;
  type?: 'default' | 'action' | 'accent';
  hasIndicator?: boolean;
  indicatorActive?: boolean;
  height?: 'default' | 'short';
  className?: string;
  onClick?: () => void;
  code?: string;
  isPressed?: boolean;
}
