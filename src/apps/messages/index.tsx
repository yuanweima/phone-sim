import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Plus, ChevronLeft, Send, Camera, Mic } from 'lucide-react'

interface MessagesProps {
  instanceId: string
}

interface Conversation {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: boolean
  avatar: string
}

interface Message {
  id: string
  text: string
  isMine: boolean
  timestamp: number
}

export default function Messages({ instanceId }: MessagesProps) {
  const { settings } = usePhoneStore()
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! How are you?', isMine: false, timestamp: Date.now() - 60000 },
    { id: '2', text: "I'm good, thanks! How about you?", isMine: true, timestamp: Date.now() - 30000 },
    { id: '3', text: 'Pretty good! Want to grab lunch later?', isMine: false, timestamp: Date.now() },
  ])

  const conversations: Conversation[] = [
    { id: '1', name: 'John', lastMessage: 'Pretty good! Want to grab lunch later?', timestamp: 'now', unread: true, avatar: '👤' },
    { id: '2', name: 'Mom', lastMessage: 'Call me when you get a chance', timestamp: '1h', unread: false, avatar: '👩' },
    { id: '3', name: 'Work Group', lastMessage: 'Meeting moved to 3pm', timestamp: '2h', unread: true, avatar: '👥' },
    { id: '4', name: 'Sarah', lastMessage: 'Thanks for dinner!', timestamp: 'Yesterday', unread: false, avatar: '👧' },
  ]

  const sendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: messageInput,
        isMine: true,
        timestamp: Date.now(),
      }])
      setMessageInput('')
    }
  }

  if (selectedConversation) {
    return (
      <div
        className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
        style={{ paddingTop: DEVICE.safeArea.top }}
      >
        {/* Header */}
        <div className={`flex items-center gap-2 px-4 py-2 border-b ${settings.darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <motion.button
            className="text-[#007aff] flex items-center"
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedConversation(null)}
          >
            <ChevronLeft size={28} />
          </motion.button>
          <div className="flex-1 text-center">
            <p className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-black'}`}>
              {selectedConversation.name}
            </p>
          </div>
          <div className="w-8" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  msg.isMine
                    ? 'bg-[#007aff] text-white rounded-br-sm'
                    : `${settings.darkMode ? 'bg-[#3a3a3c]' : 'bg-[#e9e9eb]'} ${settings.darkMode ? 'text-white' : 'text-black'} rounded-bl-sm`
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={`px-4 py-2 border-t ${settings.darkMode ? 'border-gray-800' : 'border-gray-200'}`}
          style={{ paddingBottom: DEVICE.safeArea.bottom }}
        >
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
            <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
              <Camera size={24} />
            </motion.button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="iMessage"
              className={`flex-1 bg-transparent outline-none ${settings.darkMode ? 'text-white placeholder:text-gray-500' : 'text-black placeholder:text-gray-400'}`}
            />
            {messageInput ? (
              <motion.button
                className="w-7 h-7 rounded-full bg-[#007aff] flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
              >
                <Send size={14} className="text-white ml-0.5" />
              </motion.button>
            ) : (
              <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
                <Mic size={24} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <button className="text-[#007aff]">Edit</button>
        <h1 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-black'}`}>Messages</h1>
        <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
          <Plus size={28} />
        </motion.button>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <motion.button
            key={conv.id}
            className={`w-full flex items-center gap-3 px-4 py-3 border-b ${settings.darkMode ? 'border-gray-800' : 'border-gray-200'}`}
            whileTap={{ backgroundColor: settings.darkMode ? '#1c1c1e' : '#e5e5e5' }}
            onClick={() => setSelectedConversation(conv)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
              {conv.avatar}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-black'}`}>{conv.name}</span>
                <span className={settings.darkMode ? 'text-gray-500' : 'text-gray-400'}>{conv.timestamp}</span>
              </div>
              <p className={`text-sm truncate ${conv.unread ? (settings.darkMode ? 'text-white' : 'text-black') : (settings.darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
                {conv.lastMessage}
              </p>
            </div>
            {conv.unread && <div className="w-3 h-3 rounded-full bg-[#007aff]" />}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
