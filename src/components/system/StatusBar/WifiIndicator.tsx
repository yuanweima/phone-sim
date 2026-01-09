import { usePhoneStore } from '@/store'

export function WifiIndicator() {
  const isWifiOn = usePhoneStore((state) => state.isWifiOn)
  const isAirplaneMode = usePhoneStore((state) => state.isAirplaneMode)

  // Don't show WiFi icon in airplane mode or when WiFi is off
  if (isAirplaneMode && !isWifiOn) {
    return null
  }

  // Full WiFi signal (simulated)
  const wifiStrength = isWifiOn ? 3 : 0

  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
      {/* WiFi arcs */}
      <path
        d="M8.5 2.8C11.3 2.8 13.8 3.9 15.6 5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity={wifiStrength >= 3 ? 1 : 0.3}
      />
      <path
        d="M8.5 5.5C10.4 5.5 12.1 6.3 13.3 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity={wifiStrength >= 2 ? 1 : 0.3}
      />
      <path
        d="M8.5 8.2C9.5 8.2 10.5 8.6 11.2 9.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity={wifiStrength >= 1 ? 1 : 0.3}
      />
      {/* Center dot */}
      <circle cx="8.5" cy="11" r="1.5" fill="currentColor" opacity={isWifiOn ? 1 : 0.3} />
    </svg>
  )
}
