import { DEVICE } from '@/constants/device'

export function PunchHoleCamera() {
  const ph = DEVICE.punchHole

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full z-[60]"
      style={{
        top: ph.topOffset,
        width: ph.size,
        height: ph.size,
      }}
    >
      {/* Camera lens effect */}
      <div className="absolute inset-[2px] rounded-full bg-[#1a1a2a] ring-1 ring-[#2a2a3a]" />
    </div>
  )
}
