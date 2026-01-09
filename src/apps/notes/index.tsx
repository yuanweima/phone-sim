import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { Plus, ChevronLeft, Trash2, Share, MoreHorizontal } from 'lucide-react'

interface NotesProps {
  instanceId: string
}

interface Note {
  id: string
  title: string
  content: string
  timestamp: number
}

export default function Notes({ instanceId }: NotesProps) {
  const { settings } = usePhoneStore()
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Welcome to Notes', content: 'Create your first note by tapping the compose button.', timestamp: Date.now() - 86400000 },
    { id: '2', title: 'Shopping List', content: 'Milk\nEggs\nBread\nButter', timestamp: Date.now() - 3600000 },
  ])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      timestamp: Date.now(),
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setEditTitle(newNote.title)
    setEditContent(newNote.content)
    setIsEditing(true)
  }

  const saveNote = () => {
    if (selectedNote) {
      setNotes(notes.map(n =>
        n.id === selectedNote.id
          ? { ...n, title: editTitle || 'Untitled', content: editContent, timestamp: Date.now() }
          : n
      ))
      setIsEditing(false)
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
    setSelectedNote(null)
    setIsEditing(false)
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-black' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      <AnimatePresence mode="wait">
        {selectedNote ? (
          // Note detail view
          <motion.div
            key="detail"
            className="flex-1 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2">
              <motion.button
                className="flex items-center gap-1 text-[#ff9500]"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  saveNote()
                  setSelectedNote(null)
                }}
              >
                <ChevronLeft size={24} />
                <span>Notes</span>
              </motion.button>
              <div className="flex items-center gap-4">
                <motion.button whileTap={{ scale: 0.9 }}>
                  <Share size={22} className="text-[#ff9500]" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteNote(selectedNote.id)}
                >
                  <Trash2 size={22} className="text-[#ff9500]" />
                </motion.button>
              </div>
            </div>

            {/* Note content */}
            <div className="flex-1 px-4 overflow-y-auto">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                className={`w-full text-2xl font-bold bg-transparent outline-none mb-2 ${settings.darkMode ? 'text-white placeholder:text-gray-600' : 'text-black placeholder:text-gray-400'}`}
              />
              <p className={`text-sm mb-4 ${settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatDate(selectedNote.timestamp)}
              </p>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Start typing..."
                className={`w-full h-[60vh] bg-transparent outline-none resize-none leading-relaxed ${settings.darkMode ? 'text-white placeholder:text-gray-600' : 'text-black placeholder:text-gray-400'}`}
              />
            </div>
          </motion.div>
        ) : (
          // Notes list view
          <motion.div
            key="list"
            className="flex-1 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2">
              <h1 className={`text-3xl font-bold ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                Notes
              </h1>
              <motion.button
                className="text-[#ff9500]"
                whileTap={{ scale: 0.9 }}
                onClick={createNote}
              >
                <Plus size={28} />
              </motion.button>
            </div>

            {/* Notes list */}
            <div className="flex-1 px-4 overflow-y-auto">
              {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No Notes</p>
                </div>
              ) : (
                <div className={`rounded-xl overflow-hidden ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}>
                  {notes.map((note, index) => (
                    <motion.button
                      key={note.id}
                      className={`w-full text-left px-4 py-3 ${index < notes.length - 1 ? `border-b ${settings.darkMode ? 'border-gray-800' : 'border-gray-200'}` : ''}`}
                      whileTap={{ backgroundColor: settings.darkMode ? '#2c2c2e' : '#f0f0f0' }}
                      onClick={() => {
                        setSelectedNote(note)
                        setEditTitle(note.title)
                        setEditContent(note.content)
                        setIsEditing(true)
                      }}
                    >
                      <p className={`font-semibold ${settings.darkMode ? 'text-white' : 'text-black'}`}>
                        {note.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm ${settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {formatDate(note.timestamp)}
                        </span>
                        <span className={`text-sm truncate ${settings.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {note.content.split('\n')[0].slice(0, 30)}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
