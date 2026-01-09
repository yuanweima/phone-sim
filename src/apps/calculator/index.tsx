import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'

interface CalculatorProps {
  instanceId: string
}

export default function Calculator({ instanceId }: CalculatorProps) {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const { goHome } = usePhoneStore()

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)))
  }

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 0
      default: return b
    }
  }

  const equals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display)
      const result = calculate(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  // Format display number
  const formatDisplay = (value: string) => {
    const num = parseFloat(value)
    if (isNaN(num)) return value
    if (value.includes('.') && value.endsWith('.')) return value
    if (Math.abs(num) < 1e9 && value.length <= 9) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 8 })
    }
    return num.toExponential(4)
  }

  const buttons = [
    { label: 'AC', type: 'function', action: clear },
    { label: '±', type: 'function', action: toggleSign },
    { label: '%', type: 'function', action: percentage },
    { label: '÷', type: 'operation', action: () => performOperation('÷') },
    { label: '7', type: 'number', action: () => inputDigit('7') },
    { label: '8', type: 'number', action: () => inputDigit('8') },
    { label: '9', type: 'number', action: () => inputDigit('9') },
    { label: '×', type: 'operation', action: () => performOperation('×') },
    { label: '4', type: 'number', action: () => inputDigit('4') },
    { label: '5', type: 'number', action: () => inputDigit('5') },
    { label: '6', type: 'number', action: () => inputDigit('6') },
    { label: '-', type: 'operation', action: () => performOperation('-') },
    { label: '1', type: 'number', action: () => inputDigit('1') },
    { label: '2', type: 'number', action: () => inputDigit('2') },
    { label: '3', type: 'number', action: () => inputDigit('3') },
    { label: '+', type: 'operation', action: () => performOperation('+') },
    { label: '0', type: 'number', wide: true, action: () => inputDigit('0') },
    { label: '.', type: 'number', action: inputDecimal },
    { label: '=', type: 'operation', action: equals },
  ]

  return (
    <div className="w-full h-full bg-black flex flex-col" style={{ paddingTop: DEVICE.safeArea.top }}>
      {/* Display */}
      <div className="flex-1 flex items-end justify-end px-6 pb-4">
        <span
          className="text-white font-light text-right"
          style={{
            fontSize: display.length > 9 ? '48px' : display.length > 6 ? '64px' : '80px',
          }}
        >
          {formatDisplay(display)}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3 px-4 pb-8">
        {buttons.map((btn, index) => (
          <CalculatorButton
            key={index}
            label={btn.label}
            type={btn.type as 'number' | 'operation' | 'function'}
            wide={btn.wide}
            isActive={btn.type === 'operation' && btn.label === operation && waitingForOperand}
            onClick={btn.action}
          />
        ))}
      </div>
    </div>
  )
}

interface CalculatorButtonProps {
  label: string
  type: 'number' | 'operation' | 'function'
  wide?: boolean
  isActive?: boolean
  onClick: () => void
}

function CalculatorButton({ label, type, wide, isActive, onClick }: CalculatorButtonProps) {
  const getBackgroundColor = () => {
    if (isActive) return 'bg-white'
    switch (type) {
      case 'function': return 'bg-[#a5a5a5]'
      case 'operation': return 'bg-[#ff9f0a]'
      default: return 'bg-[#333333]'
    }
  }

  const getTextColor = () => {
    if (isActive) return 'text-[#ff9f0a]'
    switch (type) {
      case 'function': return 'text-black'
      default: return 'text-white'
    }
  }

  return (
    <motion.button
      className={`
        h-20 rounded-full flex items-center justify-center
        ${getBackgroundColor()} ${getTextColor()}
        ${wide ? 'col-span-2 justify-start pl-8' : ''}
        text-3xl font-normal
      `}
      whileTap={{ opacity: 0.6 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  )
}
