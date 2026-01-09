import { usePhoneStore } from '@/store'

export function SignalIndicator() {
  const isAirplaneMode = usePhoneStore((state) => state.isAirplaneMode)
  const isCellularOn = usePhoneStore((state) => state.isCellularOn)

  if (isAirplaneMode) {
    return (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor">
        <path d="M16.1 7.6L10.3 5.7L10.3 2.5C10.3 1.1 9.2 0 7.8 0H7.2C5.8 0 4.7 1.1 4.7 2.5L4.7 5.7L-0.9 7.6C-1.2 7.7 -1.5 8 -1.5 8.4L-1.5 9.1C-1.5 9.6 -1 10 -0.5 9.9L4.7 8.3L4.7 13.3L2.2 14.9C2 15 1.8 15.2 1.8 15.5L1.8 16C1.8 16.4 2.2 16.7 2.6 16.6L7.5 15.3L12.4 16.6C12.8 16.7 13.2 16.4 13.2 16L13.2 15.5C13.2 15.2 13 15 12.8 14.9L10.3 13.3L10.3 8.3L15.5 9.9C16 10 16.5 9.6 16.5 9.1L16.5 8.4C16.5 8 16.4 7.7 16.1 7.6Z" transform="translate(1 0)" />
      </svg>
    )
  }

  if (!isCellularOn) {
    return (
      <svg width="17" height="14" viewBox="0 0 17 14" fill="currentColor" opacity="0.3">
        <rect x="1" y="10" width="3" height="4" rx="0.5" />
        <rect x="5" y="7" width="3" height="7" rx="0.5" />
        <rect x="9" y="4" width="3" height="10" rx="0.5" />
        <rect x="13" y="0" width="3" height="14" rx="0.5" />
      </svg>
    )
  }

  // Full signal strength (simulated)
  const signalBars = 4

  return (
    <svg width="17" height="14" viewBox="0 0 17 14" fill="currentColor">
      <rect x="1" y="10" width="3" height="4" rx="0.5" opacity={signalBars >= 1 ? 1 : 0.3} />
      <rect x="5" y="7" width="3" height="7" rx="0.5" opacity={signalBars >= 2 ? 1 : 0.3} />
      <rect x="9" y="4" width="3" height="10" rx="0.5" opacity={signalBars >= 3 ? 1 : 0.3} />
      <rect x="13" y="0" width="3" height="14" rx="0.5" opacity={signalBars >= 4 ? 1 : 0.3} />
    </svg>
  )
}
