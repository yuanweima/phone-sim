import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { MapPin, List, Cloud, Sun, CloudRain, Wind, Droplets, Eye } from 'lucide-react'

interface WeatherProps {
  instanceId: string
}

export default function Weather({ instanceId }: WeatherProps) {
  const { settings } = usePhoneStore()

  const hourlyForecast = [
    { time: 'Now', temp: 72, icon: Sun },
    { time: '1PM', temp: 74, icon: Sun },
    { time: '2PM', temp: 75, icon: Cloud },
    { time: '3PM', temp: 73, icon: Cloud },
    { time: '4PM', temp: 71, icon: CloudRain },
    { time: '5PM', temp: 68, icon: CloudRain },
  ]

  const weeklyForecast = [
    { day: 'Today', high: 75, low: 58, icon: Sun },
    { day: 'Tue', high: 72, low: 55, icon: Cloud },
    { day: 'Wed', high: 68, low: 52, icon: CloudRain },
    { day: 'Thu', high: 70, low: 54, icon: Cloud },
    { day: 'Fri', high: 74, low: 57, icon: Sun },
    { day: 'Sat', high: 76, low: 59, icon: Sun },
    { day: 'Sun', high: 73, low: 56, icon: Cloud },
  ]

  return (
    <div
      className="w-full h-full flex flex-col bg-gradient-to-b from-[#5bb4e5] to-[#4a9ed6] overflow-hidden"
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <motion.button className="text-white" whileTap={{ scale: 0.9 }}>
          <MapPin size={24} />
        </motion.button>
        <motion.button className="text-white" whileTap={{ scale: 0.9 }}>
          <List size={24} />
        </motion.button>
      </div>

      {/* Main weather display */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-center text-white px-4 pt-4 pb-8">
          <h1 className="text-3xl font-light">San Francisco</h1>
          <p className="text-8xl font-thin mt-2">72°</p>
          <p className="text-xl mt-2">Mostly Clear</p>
          <p className="text-lg opacity-80">H:75° L:58°</p>
        </div>

        {/* Hourly forecast */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl mx-4 p-4 mb-4">
          <p className="text-white/80 text-sm mb-3">
            Mostly clear conditions expected around 5PM.
          </p>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex flex-col items-center text-white min-w-[40px]">
                <span className="text-sm">{hour.time}</span>
                <hour.icon size={24} className="my-2" />
                <span className="font-medium">{hour.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly forecast */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl mx-4 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3 text-white/80">
            <span className="text-sm">10-DAY FORECAST</span>
          </div>
          {weeklyForecast.map((day, index) => (
            <div key={index} className={`flex items-center justify-between py-2 text-white ${index < weeklyForecast.length - 1 ? 'border-b border-white/20' : ''}`}>
              <span className="w-12">{day.day}</span>
              <day.icon size={20} />
              <div className="flex items-center gap-2 flex-1 justify-end">
                <span className="text-white/60">{day.low}°</span>
                <div className="w-20 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-300 to-orange-300 rounded-full"
                    style={{ width: `${((day.high - 50) / 30) * 100}%` }}
                  />
                </div>
                <span>{day.high}°</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-2 gap-4 mx-4 mb-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Wind size={16} />
              <span>WIND</span>
            </div>
            <p className="text-2xl">8 mph</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Droplets size={16} />
              <span>HUMIDITY</span>
            </div>
            <p className="text-2xl">62%</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Eye size={16} />
              <span>VISIBILITY</span>
            </div>
            <p className="text-2xl">10 mi</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Sun size={16} />
              <span>UV INDEX</span>
            </div>
            <p className="text-2xl">3</p>
            <p className="text-sm opacity-60">Moderate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
