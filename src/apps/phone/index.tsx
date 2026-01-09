import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Star, Clock, User, Voicemail, Keyboard, Phone, X } from 'lucide-react'

interface PhoneAppProps {
  instanceId: string
}

export default function PhoneApp({ instanceId }: PhoneAppProps) {
  const { settings } = usePhoneStore()
  const [activeTab, setActiveTab] = useState<'favorites' | 'recents' | 'contacts' | 'keypad' | 'voicemail'>('keypad')
  const [dialedNumber, setDialedNumber] = useState('')

  const tabs = [
    { id: 'favorites' as const, icon: Star, label: 'Favorites' },
    { id: 'recents' as const, icon: Clock, label: 'Recents' },
    { id: 'contacts' as const, icon: User, label: 'Contacts' },
    { id: 'keypad' as const, icon: Keyboard, label: 'Keypad' },
    { id: 'voicemail' as const, icon: Voicemail, label: 'Voicemail' },
  ]

  const keypadButtons = [
    { digit: '1', letters: '' },
    { digit: '2', letters: 'ABC' },
    { digit: '3', letters: 'DEF' },
    { digit: '4', letters: 'GHI' },
    { digit: '5', letters: 'JKL' },
    { digit: '6', letters: 'MNO' },
    { digit: '7', letters: 'PQRS' },
    { digit: '8', letters: 'TUV' },
    { digit: '9', letters: 'WXYZ' },
    { digit: '*', letters: '' },
    { digit: '0', letters: '+' },
    { digit: '#', letters: '' },
  ]

  const handleDial = (digit: string) => {
    setDialedNumber(dialedNumber + digit)
  }

  const handleDelete = () => {
    setDialedNumber(dialedNumber.slice(0, -1))
  }

  const handleCall = () => {
    if (dialedNumber) {
      // Would initiate call
      console.log('Calling:', dialedNumber)
    }
  }

  const formatNumber = (num: string) => {
    // Simple US phone number formatting
    const cleaned = num.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {activeTab === 'keypad' && (
          <>
            {/* Display */}
            <div className="h-20 flex items-center justify-center mb-4">
              <span className={`text-3xl font-light ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                {formatNumber(dialedNumber) || '\u00A0'}
              </span>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {keypadButtons.map((btn) => (
                <motion.button
                  key={btn.digit}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ${settings.darkMode ? 'bg-[#333333]' : 'bg-white'}`}
                  whileTap={{ scale: 0.95, opacity: 0.7 }}
                  onClick={() => handleDial(btn.digit)}
                >
                  <span className={`text-3xl ${settings.darkMode ? 'text-white' : 'text-black'}`}>{btn.digit}</span>
                  {btn.letters && (
                    <span className={`text-[10px] tracking-widest ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {btn.letters}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Call/Delete buttons */}
            <div className="flex items-center gap-12">
              <div className="w-20" /> {/* Spacer */}
              <motion.button
                className="w-20 h-20 rounded-full bg-[#34c759] flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                onClick={handleCall}
              >
                <Phone size={32} className="text-white" />
              </motion.button>
              <motion.button
                className="w-20 h-20 rounded-full flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
              >
                {dialedNumber && (
                  <X size={24} className={settings.darkMode ? 'text-gray-400' : 'text-gray-500'} />
                )}
              </motion.button>
            </div>
          </>
        )}

        {activeTab !== 'keypad' && (
          <div className="text-center">
            <p className={settings.darkMode ? 'text-gray-500' : 'text-gray-400'}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </p>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div
        className={`flex justify-around py-2 border-t ${settings.darkMode ? 'bg-black border-gray-800' : 'bg-[#f2f2f7] border-gray-200'}`}
        style={{ paddingBottom: DEVICE.safeArea.bottom }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-[#007aff]' : settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}
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
