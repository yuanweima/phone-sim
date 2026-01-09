import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'
import {
  Wifi, Bluetooth, Plane, Signal, AirVent, Smartphone,
  Flashlight, RotateCcw, Moon, Sun, Camera, Calculator, Timer, QrCode
} from 'lucide-react'

export function ControlCenter() {
  const {
    closeControlCenter,
    isWifiOn, toggleWifi,
    isBluetoothOn, toggleBluetooth,
    isAirplaneMode, toggleAirplaneMode,
    isCellularOn, toggleCellular,
    isAirDropOn, toggleAirDrop,
    isFlashlightOn, toggleFlashlight,
    isOrientationLocked, toggleOrientationLock,
    brightness, setBrightness,
    volume, setVolume,
    settings, toggleDarkMode,
  } = usePhoneStore()

  // Swipe down to close
  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], last, direction: [, dy] }) => {
      if (last && (my > 100 || vy > 0.5) && dy > 0) {
        closeControlCenter()
      }
    },
    { axis: 'y' }
  )

  return (
    <motion.div
      className="absolute inset-0 bg-black/60 backdrop-blur-xl flex flex-col pt-16 px-4 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeControlCenter}
      {...bind()}
    >
      {/* Top row - Connectivity controls */}
      <div className="grid grid-cols-2 gap-3 mb-3" onClick={(e) => e.stopPropagation()}>
        {/* Connectivity group */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-3 grid grid-cols-2 gap-2">
          <ControlButton
            icon={Plane}
            active={isAirplaneMode}
            onClick={toggleAirplaneMode}
            label="Airplane"
          />
          <ControlButton
            icon={Signal}
            active={isCellularOn}
            onClick={toggleCellular}
            label="Cellular"
          />
          <ControlButton
            icon={Wifi}
            active={isWifiOn}
            onClick={toggleWifi}
            label="WiFi"
          />
          <ControlButton
            icon={Bluetooth}
            active={isBluetoothOn}
            onClick={toggleBluetooth}
            label="Bluetooth"
          />
        </div>

        {/* Now Playing placeholder */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">Not Playing</div>
            <div className="text-white/60 text-xs truncate">Music</div>
          </div>
        </div>
      </div>

      {/* Sliders row */}
      <div className="grid grid-cols-2 gap-3 mb-3" onClick={(e) => e.stopPropagation()}>
        {/* Brightness slider */}
        <VerticalSlider
          value={brightness}
          onChange={setBrightness}
          icon={<Sun size={20} className="text-white" />}
        />

        {/* Volume slider */}
        <VerticalSlider
          value={volume}
          onChange={setVolume}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          }
        />
      </div>

      {/* Quick toggles grid */}
      <div className="grid grid-cols-4 gap-3 mb-3" onClick={(e) => e.stopPropagation()}>
        <ControlTile
          icon={Flashlight}
          active={isFlashlightOn}
          onClick={toggleFlashlight}
          label="Flashlight"
        />
        <ControlTile
          icon={Timer}
          onClick={() => {}}
          label="Timer"
        />
        <ControlTile
          icon={Calculator}
          onClick={() => {}}
          label="Calculator"
        />
        <ControlTile
          icon={Camera}
          onClick={() => {}}
          label="Camera"
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-4 gap-3" onClick={(e) => e.stopPropagation()}>
        <ControlTile
          icon={RotateCcw}
          active={isOrientationLocked}
          onClick={toggleOrientationLock}
          label="Lock"
        />
        <ControlTile
          icon={settings.darkMode ? Moon : Sun}
          active={settings.darkMode}
          onClick={toggleDarkMode}
          label="Dark Mode"
        />
        <ControlTile
          icon={AirVent}
          active={isAirDropOn}
          onClick={toggleAirDrop}
          label="AirDrop"
        />
        <ControlTile
          icon={QrCode}
          onClick={() => {}}
          label="Scan"
        />
      </div>
    </motion.div>
  )
}

interface ControlButtonProps {
  icon: React.ComponentType<any>
  active?: boolean
  onClick: () => void
  label: string
}

function ControlButton({ icon: Icon, active, onClick, label }: ControlButtonProps) {
  return (
    <motion.button
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        active ? 'bg-white text-blue-500' : 'bg-white/20 text-white'
      }`}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <Icon size={20} />
    </motion.button>
  )
}

interface ControlTileProps {
  icon: React.ComponentType<any>
  active?: boolean
  onClick: () => void
  label: string
}

function ControlTile({ icon: Icon, active, onClick, label }: ControlTileProps) {
  return (
    <motion.button
      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 ${
        active ? 'bg-white text-blue-500' : 'bg-white/20 text-white'
      }`}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <Icon size={24} />
      <span className="text-[10px] font-medium">{label}</span>
    </motion.button>
  )
}

interface VerticalSliderProps {
  value: number
  onChange: (value: number) => void
  icon: React.ReactNode
}

function VerticalSlider({ value, onChange, icon }: VerticalSliderProps) {
  const bind = useDrag(
    ({ xy: [, y], target, memo }) => {
      const rect = (target as HTMLElement).getBoundingClientRect()
      const newValue = 100 - ((y - rect.top) / rect.height) * 100
      onChange(Math.max(0, Math.min(100, newValue)))
      return memo
    },
    { pointer: { touch: true } }
  )

  return (
    <motion.div
      className="h-36 bg-white/20 backdrop-blur-xl rounded-3xl relative overflow-hidden cursor-pointer"
      {...bind()}
      whileTap={{ scale: 0.98 }}
    >
      {/* Fill */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white/90 transition-all duration-100"
        style={{ height: `${value}%` }}
      />

      {/* Icon */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        {icon}
      </div>
    </motion.div>
  )
}
