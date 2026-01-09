import { useState, useEffect } from 'react'
import { usePhoneStore } from '@/store'

export function BatteryIndicator() {
  const [batteryLevel, setBatteryLevel] = useState(87)
  const [isCharging, setIsCharging] = useState(false)

  // Simulate battery API (if available) or use static value
  useEffect(() => {
    // @ts-ignore - Battery API might not be available
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100))
        setIsCharging(battery.charging)

        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging)
        })
      })
    }
  }, [])

  // Determine battery color
  const getBatteryColor = () => {
    if (isCharging) return '#34C759' // Green
    if (batteryLevel <= 20) return '#FF3B30' // Red
    if (batteryLevel <= 50) return '#FFCC00' // Yellow
    return 'currentColor'
  }

  const batteryWidth = Math.max(4, (batteryLevel / 100) * 19)

  return (
    <div className="flex items-center gap-1">
      <span className="text-[12px] font-medium opacity-90">{batteryLevel}%</span>
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
        {/* Battery body */}
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="12"
          rx="2.5"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
          fill="none"
        />
        {/* Battery level */}
        <rect
          x="2"
          y="2"
          width={batteryWidth}
          height="9"
          rx="1"
          fill={getBatteryColor()}
        />
        {/* Battery cap */}
        <path
          d="M25 4.5V8.5C25.8 8.5 26 8 26 7V6C26 5 25.8 4.5 25 4.5Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
        {/* Charging bolt */}
        {isCharging && (
          <path
            d="M13 2L9 7H12L11 11L15 6H12L13 2Z"
            fill="#1a1a1a"
            stroke="#1a1a1a"
            strokeWidth="0.5"
          />
        )}
      </svg>
    </div>
  )
}
