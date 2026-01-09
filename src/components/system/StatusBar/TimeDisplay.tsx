import { useState, useEffect } from 'react'
import { format } from 'date-fns'

export function TimeDisplay() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <span className="text-[17px] font-semibold tracking-tight">
      {format(time, 'h:mm')}
    </span>
  )
}
