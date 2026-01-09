import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { iosSpring } from '@/constants/animations'

export function PageDots() {
  const homePages = usePhoneStore((state) => state.homePages)
  const currentPage = usePhoneStore((state) => state.currentPage)
  const setCurrentPage = usePhoneStore((state) => state.setCurrentPage)

  const { size, spacing, bottomOffset } = DEVICE.pageDots

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
      style={{ bottom: DEVICE.dock.bottomOffset + DEVICE.dock.height + bottomOffset }}
    >
      {homePages.map((page, index) => (
        <motion.button
          key={page.id}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: index === currentPage ? 'white' : 'rgba(255, 255, 255, 0.3)',
          }}
          animate={{
            scale: index === currentPage ? 1.2 : 1,
          }}
          transition={iosSpring.responsive}
          onClick={() => setCurrentPage(index)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </div>
  )
}
