import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

export function LockClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Time - smaller font size to fit properly */}
      <div className="text-[64px] font-light tracking-tight leading-none">
        {format(time, 'h:mm')}
      </div>

      {/* Date */}
      <div className="text-[17px] font-normal mt-2 opacity-90">
        {format(time, 'EEEE, MMMM d')}
      </div>
    </motion.div>
  )
}
