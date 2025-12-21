import React, { useState } from 'react';
import { Wifi, Bluetooth, Plane, Bell, Moon, Volume2, Globe, HardDrive, Shield, MapPin, User } from 'lucide-react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
        ${enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}
      `}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  hasToggle?: boolean;
  toggleState?: boolean;
  onToggle?: (state: boolean) => void;
  hasChevron?: boolean;
  badge?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  title,
  subtitle,
  value,
  hasToggle,
  toggleState = false,
  onToggle,
  hasChevron,
  badge
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {value && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {value}
          </span>
        )}
        {hasToggle && onToggle && (
          <ToggleSwitch enabled={toggleState} onChange={onToggle} label={title} />
        )}
        {hasChevron && (
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </div>
  );
};

const SettingsPanel: React.FC = () => {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your workspace preferences and device controls.
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-6 max-h-[600px] overflow-y-auto">
        
        {/* CONNECTIVITY Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
            Connectivity
          </h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Plane size={18} />}
              title="Airplane Mode"
              hasToggle
              toggleState={airplaneMode}
              onToggle={setAirplaneMode}
            />
            <SettingRow
              icon={<Wifi size={18} />}
              title="Wi-Fi"
              value="Home_Network_5G"
              badge="On"
              hasChevron
            />
            <SettingRow
              icon={<Bluetooth size={18} />}
              title="Bluetooth"
              badge="On"
              hasToggle
              toggleState={bluetooth}
              onToggle={setBluetooth}
            />
          </div>
        </section>

        {/* FOCUS & SOUNDS Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
            Focus & Sounds
          </h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Bell size={18} />}
              title="Allow Notifications"
              subtitle="Apps can request to send you alerts."
              hasToggle
              toggleState={notifications}
              onToggle={setNotifications}
            />
            <SettingRow
              icon={<Moon size={18} />}
              title="Do Not Disturb"
              subtitle="Silence all calls and alerts."
              hasToggle
              toggleState={dnd}
              onToggle={setDnd}
            />
            <SettingRow
              icon={<Volume2 size={18} />}
              title="Sound Effects"
              subtitle="Play haptic sounds during interaction."
              hasToggle
              toggleState={soundEffects}
              onToggle={setSoundEffects}
            />
          </div>
        </section>

        {/* SYSTEM PREFERENCES Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
            System Preferences
          </h2>
          <div className="space-y-1">
            <SettingRow
              icon={<Globe size={18} />}
              title="Language & Region"
              value="English (US)"
              hasChevron
            />
            <SettingRow
              icon={<HardDrive size={18} />}
              title="Storage"
              subtitle="240GB of 512GB used"
              hasChevron
            />
            <SettingRow
              icon={<Shield size={18} />}
              title="Automatic Updates"
              subtitle="Install security patches automatically."
              hasToggle
              toggleState={autoUpdates}
              onToggle={setAutoUpdates}
            />
          </div>
        </section>

        {/* PRIVACY & SECURITY Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-4">
            Privacy & Security
          </h2>
          <div className="space-y-1">
            <SettingRow
              icon={<MapPin size={18} />}
              title="Location Services"
              hasToggle
              toggleState={locationServices}
              onToggle={setLocationServices}
            />
            <SettingRow
              icon={<User size={18} />}
              title="Profile Information"
              hasChevron
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Version 2.5.0
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
          Designed for precision.
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;
