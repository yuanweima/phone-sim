import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { AppIcon } from './AppIcon'

export function Dock() {
  const dockApps = usePhoneStore((state) => state.dockApps)
  const setEditMode = usePhoneStore((state) => state.setEditMode)

  const { height, iconCount, iconSize, padding, bottomOffset, borderRadius } = DEVICE.dock

  // Calculate spacing
  const dockWidth = DEVICE.width - padding * 2
  const totalIconWidth = iconSize * iconCount
  const spacing = (dockWidth - totalIconWidth) / (iconCount + 1)

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-2xl"
      style={{
        bottom: bottomOffset,
        height: height,
        width: dockWidth,
        borderRadius: borderRadius,
        paddingTop: (height - iconSize - 16) / 2,
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <div
        className="flex justify-around items-start h-full px-4"
      >
        {dockApps.slice(0, iconCount).map((appId) => (
          <AppIcon
            key={appId}
            appId={appId}
            onLongPress={() => setEditMode(true)}
          />
        ))}
      </div>
    </motion.div>
  )
}
