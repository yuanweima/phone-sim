import { motion } from 'framer-motion'
import { DEVICE } from '@/constants/device'
import { Screen } from './Screen'

export default function PhoneFrame() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Device outer frame (bezel) */}
      <motion.div
        className="relative bg-[#1a1a1a] shadow-2xl"
        style={{
          width: DEVICE.frameWidth,
          height: DEVICE.frameHeight,
          borderRadius: DEVICE.frameBorderRadius,
          padding: DEVICE.frameBezelWidth,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Inner frame border highlight */}
        <div
          className="absolute inset-[1px] rounded-[54px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* Screen container */}
        <div
          className="relative w-full h-full overflow-hidden bg-black"
          style={{ borderRadius: DEVICE.screenBorderRadius }}
        >
          <Screen />
        </div>

        {/* Physical buttons (visual only) */}
        {/* Side button (right) */}
        <div
          className="absolute bg-[#2a2a2a] rounded-r-sm"
          style={{
            right: -3,
            top: 180,
            width: 3,
            height: 100,
          }}
        />

        {/* Silent switch (left top) */}
        <div
          className="absolute bg-[#2a2a2a] rounded-l-sm"
          style={{
            left: -3,
            top: 130,
            width: 3,
            height: 30,
          }}
        />

        {/* Volume up (left) */}
        <div
          className="absolute bg-[#2a2a2a] rounded-l-sm"
          style={{
            left: -3,
            top: 180,
            width: 3,
            height: 55,
          }}
        />

        {/* Volume down (left) */}
        <div
          className="absolute bg-[#2a2a2a] rounded-l-sm"
          style={{
            left: -3,
            top: 250,
            width: 3,
            height: 55,
          }}
        />
      </motion.div>

      {/* Reflection/glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          borderRadius: DEVICE.frameBorderRadius,
        }}
      />
    </div>
  )
}
