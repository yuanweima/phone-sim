import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Plus, Globe, AlarmClock, Timer, Hourglass } from 'lucide-react'

interface ClockProps {
  instanceId: string
}

type TabType = 'world' | 'alarm' | 'stopwatch' | 'timer'

export default function Clock({ instanceId }: ClockProps) {
  const { settings } = usePhoneStore()
  const [activeTab, setActiveTab] = useState<TabType>('world')

  const tabs = [
    { id: 'world' as const, icon: Globe, label: 'World Clock' },
    { id: 'alarm' as const, icon: AlarmClock, label: 'Alarm' },
    { id: 'stopwatch' as const, icon: Hourglass, label: 'Stopwatch' },
    { id: 'timer' as const, icon: Timer, label: 'Timer' },
  ]

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Content based on active tab */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'world' && <WorldClockTab isDark={settings.darkMode} />}
        {activeTab === 'alarm' && <AlarmTab isDark={settings.darkMode} />}
        {activeTab === 'stopwatch' && <StopwatchTab isDark={settings.darkMode} />}
        {activeTab === 'timer' && <TimerTab isDark={settings.darkMode} />}
      </div>

      {/* Tab bar */}
      <div className={`flex justify-around py-2 border-t ${settings.darkMode ? 'bg-[#1c1c1e] border-gray-800' : 'bg-white border-gray-200'}`}
        style={{ paddingBottom: DEVICE.safeArea.bottom }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex flex-col items-center gap-1 px-4 py-1 ${activeTab === tab.id ? 'text-[#ff9500]' : settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={24} />
            <span className="text-[10px]">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function WorldClockTab({ isDark }: { isDark: boolean }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const cities = [
    { name: 'Tokyo', offset: 9 },
    { name: 'New York', offset: -5 },
    { name: 'London', offset: 0 },
    { name: 'Sydney', offset: 11 },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>World Clock</h1>
        <motion.button
          className="text-[#ff9500]"
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={28} />
        </motion.button>
      </div>
      <div className="flex-1 px-4">
        {cities.map((city) => {
          const cityTime = new Date(time.getTime() + city.offset * 3600000)
          const hours = cityTime.getUTCHours()
          const isDay = hours >= 6 && hours < 18
          return (
            <div key={city.name} className={`py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDay ? '☀️' : '🌙'} Today, {city.offset >= 0 ? '+' : ''}{city.offset}HRS
                  </p>
                  <p className={`text-2xl font-light ${isDark ? 'text-white' : 'text-black'}`}>{city.name}</p>
                </div>
                <p className={`text-5xl font-light ${isDark ? 'text-white' : 'text-black'}`}>
                  {cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AlarmTab({ isDark }: { isDark: boolean }) {
  const [alarms] = useState([
    { time: '07:00', label: 'Wake up', enabled: true },
    { time: '08:30', label: 'Leave for work', enabled: false },
  ])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <button className={`text-[#ff9500]`}>Edit</button>
        <h1 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Alarm</h1>
        <motion.button className="text-[#ff9500]" whileTap={{ scale: 0.9 }}>
          <Plus size={28} />
        </motion.button>
      </div>
      <div className="flex-1 px-4">
        {alarms.map((alarm, index) => (
          <div key={index} className={`py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-5xl font-light ${alarm.enabled ? (isDark ? 'text-white' : 'text-black') : 'text-gray-500'}`}>
                  {alarm.time}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{alarm.label}</p>
              </div>
              <div className={`w-12 h-7 rounded-full p-0.5 ${alarm.enabled ? 'bg-[#34c759]' : isDark ? 'bg-[#39393d]' : 'bg-gray-300'}`}>
                <div className={`w-6 h-6 rounded-full bg-white shadow ${alarm.enabled ? 'ml-5' : ''}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StopwatchTab({ isDark }: { isDark: boolean }) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 10), 10)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }

  const handleLap = () => {
    setLaps([time, ...laps])
  }

  const handleReset = () => {
    setTime(0)
    setLaps([])
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex-1 flex items-center justify-center">
        <p className={`text-7xl font-light font-mono ${isDark ? 'text-white' : 'text-black'}`}>
          {formatTime(time)}
        </p>
      </div>
      <div className="flex gap-20 mb-8">
        <motion.button
          className={`w-20 h-20 rounded-full flex items-center justify-center ${isDark ? 'bg-[#333333]' : 'bg-gray-200'}`}
          whileTap={{ scale: 0.95 }}
          onClick={isRunning ? handleLap : handleReset}
        >
          <span className={isDark ? 'text-white' : 'text-black'}>{isRunning ? 'Lap' : 'Reset'}</span>
        </motion.button>
        <motion.button
          className={`w-20 h-20 rounded-full flex items-center justify-center ${isRunning ? 'bg-[#ff3b30]/20' : 'bg-[#34c759]/20'}`}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
        >
          <span className={isRunning ? 'text-[#ff3b30]' : 'text-[#34c759]'}>
            {isRunning ? 'Stop' : 'Start'}
          </span>
        </motion.button>
      </div>
      <div className="w-full px-4 overflow-y-auto max-h-40">
        {laps.map((lap, index) => (
          <div key={index} className={`flex justify-between py-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <span className={isDark ? 'text-white' : 'text-black'}>Lap {laps.length - index}</span>
            <span className={isDark ? 'text-white' : 'text-black'}>{formatTime(lap)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimerTab({ isDark }: { isDark: boolean }) {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const handleStart = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    setTimeLeft(totalSeconds)
    setIsRunning(true)
  }

  const formatTimeLeft = () => {
    const h = Math.floor(timeLeft / 3600)
    const m = Math.floor((timeLeft % 3600) / 60)
    const s = timeLeft % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {isRunning ? (
        <p className={`text-7xl font-light font-mono ${isDark ? 'text-white' : 'text-black'}`}>
          {formatTimeLeft()}
        </p>
      ) : (
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
              className={`w-20 text-5xl font-light text-center bg-transparent ${isDark ? 'text-white' : 'text-black'}`}
              min="0"
              max="23"
            />
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>hours</p>
          </div>
          <span className={`text-5xl font-light ${isDark ? 'text-white' : 'text-black'}`}>:</span>
          <div className="text-center">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              className={`w-20 text-5xl font-light text-center bg-transparent ${isDark ? 'text-white' : 'text-black'}`}
              min="0"
              max="59"
            />
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>min</p>
          </div>
          <span className={`text-5xl font-light ${isDark ? 'text-white' : 'text-black'}`}>:</span>
          <div className="text-center">
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              className={`w-20 text-5xl font-light text-center bg-transparent ${isDark ? 'text-white' : 'text-black'}`}
              min="0"
              max="59"
            />
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>sec</p>
          </div>
        </div>
      )}
      <motion.button
        className={`mt-8 w-20 h-20 rounded-full flex items-center justify-center ${isRunning ? 'bg-[#ff3b30]/20' : 'bg-[#34c759]/20'}`}
        whileTap={{ scale: 0.95 }}
        onClick={isRunning ? () => setIsRunning(false) : handleStart}
      >
        <span className={isRunning ? 'text-[#ff3b30]' : 'text-[#34c759]'}>
          {isRunning ? 'Pause' : 'Start'}
        </span>
      </motion.button>
    </div>
  )
}
