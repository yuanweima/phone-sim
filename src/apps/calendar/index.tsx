import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns'

interface CalendarProps {
  instanceId: string
}

export default function Calendar({ instanceId }: CalendarProps) {
  const { settings } = usePhoneStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad with empty days for alignment
  const startPadding = monthStart.getDay()
  const paddedDays = [...Array(startPadding).fill(null), ...days]

  const events = [
    { date: new Date(), title: 'Team Meeting', time: '10:00 AM', color: '#007aff' },
    { date: new Date(), title: 'Lunch with Sarah', time: '12:30 PM', color: '#34c759' },
    { date: new Date(Date.now() + 86400000), title: 'Project Deadline', time: '5:00 PM', color: '#ff3b30' },
  ]

  const dayEvents = events.filter(e =>
    e.date.toDateString() === selectedDate.toDateString()
  )

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className={`text-3xl font-bold ${settings.darkMode ? 'text-white' : 'text-black'}`}>
          {format(currentMonth, 'MMMM yyyy')}
        </h1>
        <div className="flex items-center gap-2">
          <motion.button className="text-[#ff3b30]" whileTap={{ scale: 0.9 }}>
            <Search size={22} />
          </motion.button>
          <motion.button className="text-[#ff3b30]" whileTap={{ scale: 0.9 }}>
            <Plus size={28} />
          </motion.button>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 mb-2">
        <motion.button
          className="text-[#ff3b30] p-2"
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          className="text-[#ff3b30] text-sm font-medium"
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentMonth(new Date())}
        >
          Today
        </motion.button>
        <motion.button
          className="text-[#ff3b30] p-2"
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Calendar grid */}
      <div className="px-4 mb-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className={`text-center text-xs font-medium ${settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {paddedDays.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />
            const isSelected = day.toDateString() === selectedDate.toDateString()
            const hasEvent = events.some(e => e.date.toDateString() === day.toDateString())

            return (
              <motion.button
                key={day.toISOString()}
                className={`aspect-square flex flex-col items-center justify-center rounded-full ${
                  isToday(day)
                    ? 'bg-[#ff3b30] text-white'
                    : isSelected
                    ? settings.darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    : ''
                }`}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDate(day)}
              >
                <span className={`text-sm ${
                  isToday(day)
                    ? 'font-semibold'
                    : settings.darkMode ? 'text-white' : 'text-black'
                }`}>
                  {format(day, 'd')}
                </span>
                {hasEvent && !isToday(day) && (
                  <div className="w-1 h-1 rounded-full bg-[#ff3b30] mt-0.5" />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Events for selected date */}
      <div className="flex-1 overflow-y-auto px-4">
        <h2 className={`text-sm font-medium mb-2 ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {format(selectedDate, 'EEEE, MMMM d')}
        </h2>
        {dayEvents.length === 0 ? (
          <p className={`text-center py-8 ${settings.darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            No events
          </p>
        ) : (
          <div className="space-y-2">
            {dayEvents.map((event, i) => (
              <motion.div
                key={i}
                className={`p-3 rounded-lg ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-10 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div>
                    <p className={`font-medium ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                      {event.title}
                    </p>
                    <p className={settings.darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {event.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
