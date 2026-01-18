import { motion } from 'framer-motion'

interface PlaceholderAppProps {
  name: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  color: string
}

export function PlaceholderApp({ name, icon: Icon, color }: PlaceholderAppProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-black text-white p-8">
      <motion.div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
        style={{ backgroundColor: color }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Icon size={48} strokeWidth={1.5} />
      </motion.div>
      <motion.h1
        className="text-2xl font-semibold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {name}
      </motion.h1>
      <motion.p
        className="text-gray-400 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Coming Soon
      </motion.p>
    </div>
  )
}
