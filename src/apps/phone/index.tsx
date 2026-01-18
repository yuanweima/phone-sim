import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Star, Clock, User, Voicemail, Keyboard, Phone, X, Plus, ChevronRight, Info, Play } from 'lucide-react'

interface PhoneAppProps {
  instanceId: string
}

interface Contact {
  id: string
  name: string
  phone: string
  avatar: string
  isFavorite: boolean
}

interface CallRecord {
  id: string
  contactId: string
  name: string
  phone: string
  type: 'incoming' | 'outgoing' | 'missed'
  timestamp: number
  duration?: number
}

interface VoicemailItem {
  id: string
  name: string
  phone: string
  timestamp: number
  duration: number
  isNew: boolean
}

const mockContacts: Contact[] = [
  { id: '1', name: 'Alice Chen', phone: '(555) 123-4567', avatar: '👩', isFavorite: true },
  { id: '2', name: 'Bob Smith', phone: '(555) 234-5678', avatar: '👨', isFavorite: true },
  { id: '3', name: 'Carol Wang', phone: '(555) 345-6789', avatar: '👩‍💼', isFavorite: false },
  { id: '4', name: 'David Lee', phone: '(555) 456-7890', avatar: '👨‍💻', isFavorite: true },
  { id: '5', name: 'Emma Davis', phone: '(555) 567-8901', avatar: '👩‍🎨', isFavorite: false },
  { id: '6', name: 'Frank Miller', phone: '(555) 678-9012', avatar: '👨‍🔧', isFavorite: false },
  { id: '7', name: 'Grace Kim', phone: '(555) 789-0123', avatar: '👩‍⚕️', isFavorite: false },
  { id: '8', name: 'Henry Zhang', phone: '(555) 890-1234', avatar: '👨‍🏫', isFavorite: false },
  { id: '9', name: 'Mom', phone: '(555) 111-2222', avatar: '👩‍👦', isFavorite: true },
  { id: '10', name: 'Dad', phone: '(555) 333-4444', avatar: '👨‍👦', isFavorite: true },
]

const mockCallHistory: CallRecord[] = [
  { id: '1', contactId: '1', name: 'Alice Chen', phone: '(555) 123-4567', type: 'incoming', timestamp: Date.now() - 1800000, duration: 245 },
  { id: '2', contactId: '9', name: 'Mom', phone: '(555) 111-2222', type: 'missed', timestamp: Date.now() - 7200000 },
  { id: '3', contactId: '2', name: 'Bob Smith', phone: '(555) 234-5678', type: 'outgoing', timestamp: Date.now() - 14400000, duration: 120 },
  { id: '4', contactId: '4', name: 'David Lee', phone: '(555) 456-7890', type: 'incoming', timestamp: Date.now() - 86400000, duration: 380 },
  { id: '5', contactId: '9', name: 'Mom', phone: '(555) 111-2222', type: 'outgoing', timestamp: Date.now() - 172800000, duration: 560 },
  { id: '6', contactId: '3', name: 'Carol Wang', phone: '(555) 345-6789', type: 'missed', timestamp: Date.now() - 259200000 },
]

const mockVoicemails: VoicemailItem[] = [
  { id: '1', name: 'Mom', phone: '(555) 111-2222', timestamp: Date.now() - 3600000, duration: 45, isNew: true },
  { id: '2', name: 'Unknown', phone: '(555) 999-8888', timestamp: Date.now() - 86400000, duration: 30, isNew: true },
  { id: '3', name: 'Bob Smith', phone: '(555) 234-5678', timestamp: Date.now() - 172800000, duration: 62, isNew: false },
]

export default function PhoneApp({ instanceId }: PhoneAppProps) {
  const { settings } = usePhoneStore()
  const [activeTab, setActiveTab] = useState<'favorites' | 'recents' | 'contacts' | 'keypad' | 'voicemail'>('keypad')
  const [dialedNumber, setDialedNumber] = useState('')
  const [contacts] = useState(mockContacts)
  const [callHistory] = useState(mockCallHistory)
  const [voicemails] = useState(mockVoicemails)

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
      console.log('Calling:', dialedNumber)
    }
  }

  const formatNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const date = new Date(timestamp)

    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    } else if (diff < 172800000) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' })
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'favorites' && (
          <FavoritesTab
            contacts={contacts.filter(c => c.isFavorite)}
            isDark={settings.darkMode}
          />
        )}

        {activeTab === 'recents' && (
          <RecentsTab
            callHistory={callHistory}
            isDark={settings.darkMode}
            formatTime={formatTime}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactsTab
            contacts={contacts}
            isDark={settings.darkMode}
          />
        )}

        {activeTab === 'keypad' && (
          <div className="flex-1 flex flex-col items-center justify-center px-8">
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
              <div className="w-20" />
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
          </div>
        )}

        {activeTab === 'voicemail' && (
          <VoicemailTab
            voicemails={voicemails}
            isDark={settings.darkMode}
            formatTime={formatTime}
            formatDuration={formatDuration}
          />
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

// Favorites Tab
function FavoritesTab({ contacts, isDark }: { contacts: Contact[], isDark: boolean }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Favorites</h1>
        <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
          <Plus size={28} />
        </motion.button>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Star size={48} className={isDark ? 'text-gray-700' : 'text-gray-300'} />
            <p className={`mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No Favorites</p>
            <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Add favorites for quick access</p>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
            {contacts.map((contact, index) => (
              <motion.button
                key={contact.id}
                className={`w-full flex items-center gap-4 px-4 py-3 ${index < contacts.length - 1 ? `border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}` : ''}`}
                whileTap={{ backgroundColor: isDark ? '#2c2c2e' : '#f0f0f0' }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                  {contact.avatar}
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{contact.name}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>mobile</p>
                </div>
                <Info size={20} className="text-[#007aff]" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Recents Tab
function RecentsTab({ callHistory, isDark, formatTime }: {
  callHistory: CallRecord[],
  isDark: boolean,
  formatTime: (timestamp: number) => string
}) {
  const [filter, setFilter] = useState<'all' | 'missed'>('all')

  const filteredHistory = filter === 'missed'
    ? callHistory.filter(c => c.type === 'missed')
    : callHistory

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <button className="text-[#007aff]">Edit</button>
        <div className={`flex rounded-lg overflow-hidden ${isDark ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
          <button
            className={`px-4 py-1 text-sm ${filter === 'all' ? 'bg-[#007aff] text-white' : isDark ? 'text-white' : 'text-black'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-1 text-sm ${filter === 'missed' ? 'bg-[#007aff] text-white' : isDark ? 'text-white' : 'text-black'}`}
            onClick={() => setFilter('missed')}
          >
            Missed
          </button>
        </div>
        <div className="w-10" />
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Clock size={48} className={isDark ? 'text-gray-700' : 'text-gray-300'} />
            <p className={`mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No Recent Calls</p>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
            {filteredHistory.map((call, index) => (
              <motion.button
                key={call.id}
                className={`w-full flex items-center gap-4 px-4 py-3 ${index < filteredHistory.length - 1 ? `border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}` : ''}`}
                whileTap={{ backgroundColor: isDark ? '#2c2c2e' : '#f0f0f0' }}
              >
                <div className="flex-1 text-left">
                  <p className={`font-medium ${call.type === 'missed' ? 'text-[#ff3b30]' : isDark ? 'text-white' : 'text-black'}`}>
                    {call.name}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {call.type === 'incoming' ? '📲 ' : call.type === 'outgoing' ? '📱 ' : '📵 '}
                    mobile
                  </p>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {formatTime(call.timestamp)}
                </span>
                <Info size={20} className="text-[#007aff]" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Contacts Tab
function ContactsTab({ contacts, isDark }: { contacts: Contact[], isDark: boolean }) {
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name))

  // Group contacts by first letter
  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const letter = contact.name[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(contact)
    return acc
  }, {} as Record<string, Contact[]>)

  const letters = Object.keys(groupedContacts).sort()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Contacts</h1>
        <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
          <Plus size={28} />
        </motion.button>
      </div>

      {/* Search bar */}
      <div className="px-4 py-2">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>🔍</span>
          <input
            type="text"
            placeholder="Search"
            className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder:text-gray-500' : 'text-black placeholder:text-gray-400'}`}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {letters.map(letter => (
          <div key={letter}>
            <div className={`px-4 py-1 text-sm font-semibold ${isDark ? 'bg-black text-gray-400' : 'bg-[#f2f2f7] text-gray-500'}`}>
              {letter}
            </div>
            <div className={isDark ? 'bg-[#1c1c1e]' : 'bg-white'}>
              {groupedContacts[letter].map((contact, index) => (
                <motion.button
                  key={contact.id}
                  className={`w-full flex items-center gap-4 px-4 py-3 ${index < groupedContacts[letter].length - 1 ? `border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}` : ''}`}
                  whileTap={{ backgroundColor: isDark ? '#2c2c2e' : '#f0f0f0' }}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{contact.name}</p>
                  </div>
                  <ChevronRight size={20} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Voicemail Tab
function VoicemailTab({ voicemails, isDark, formatTime, formatDuration }: {
  voicemails: VoicemailItem[],
  isDark: boolean,
  formatTime: (timestamp: number) => string,
  formatDuration: (seconds: number) => string
}) {
  const [playingId, setPlayingId] = useState<string | null>(null)

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Voicemail</h1>
        <button className="text-[#007aff]">Greeting</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        {voicemails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Voicemail size={48} className={isDark ? 'text-gray-700' : 'text-gray-300'} />
            <p className={`mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No Voicemail</p>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
            {voicemails.map((vm, index) => (
              <motion.div
                key={vm.id}
                className={`px-4 py-3 ${index < voicemails.length - 1 ? `border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}` : ''}`}
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${playingId === vm.id ? 'bg-[#007aff]' : isDark ? 'bg-[#2c2c2e]' : 'bg-gray-200'}`}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPlayingId(playingId === vm.id ? null : vm.id)}
                  >
                    <Play size={16} className={playingId === vm.id ? 'text-white ml-0.5' : isDark ? 'text-white' : 'text-gray-600'} fill={playingId === vm.id ? 'white' : 'none'} />
                  </motion.button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>{vm.name}</p>
                      {vm.isNew && (
                        <div className="w-2 h-2 rounded-full bg-[#007aff]" />
                      )}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{vm.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{formatTime(vm.timestamp)}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{formatDuration(vm.duration)}</p>
                  </div>
                </div>
                {playingId === vm.id && (
                  <motion.div
                    className="mt-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className={`h-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-full bg-[#007aff] rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '30%' }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
