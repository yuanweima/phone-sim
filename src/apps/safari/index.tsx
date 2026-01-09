import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePhoneStore } from '@/store'
import { DEVICE } from '@/constants/device'
import { ChevronLeft, ChevronRight, Share, BookOpen, Layers, RefreshCw, X } from 'lucide-react'

interface SafariProps {
  instanceId: string
}

export default function Safari({ instanceId }: SafariProps) {
  const { settings } = usePhoneStore()
  const [url, setUrl] = useState('https://m.baidu.com')
  const [inputUrl, setInputUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<string[]>(['https://m.baidu.com'])
  const [historyIndex, setHistoryIndex] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < history.length - 1

  const handleNavigate = () => {
    if (inputUrl.trim()) {
      let newUrl = inputUrl.trim()
      if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
        // Check if it looks like a domain
        if (newUrl.includes('.') && !newUrl.includes(' ')) {
          newUrl = 'https://' + newUrl
        } else {
          // Treat as search query - use mobile Baidu
          newUrl = `https://m.baidu.com/s?word=${encodeURIComponent(newUrl)}`
        }
      }
      navigateTo(newUrl)
      setInputUrl('')
    }
  }

  const navigateTo = (newUrl: string) => {
    setUrl(newUrl)
    setIsLoading(true)
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newUrl)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const goBack = () => {
    if (canGoBack) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setUrl(history[newIndex])
      setIsLoading(true)
    }
  }

  const goForward = () => {
    if (canGoForward) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setUrl(history[newIndex])
      setIsLoading(true)
    }
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }

  // Extract domain for display
  const displayUrl = (() => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return url
    }
  })()

  return (
    <div
      className={`w-full h-full flex flex-col ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-[#f2f2f7]'}`}
      style={{ paddingTop: DEVICE.safeArea.top }}
    >
      {/* Browser content - use full width, websites will detect mobile width */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {/* Loading bar */}
        {isLoading && (
          <motion.div
            className="absolute top-0 left-0 h-0.5 bg-[#007aff] z-10"
            initial={{ width: '0%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 3, ease: 'easeOut' }}
          />
        )}

        {/* iframe for web content - actual phone width triggers mobile layouts */}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-none bg-white"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"
          onLoad={handleIframeLoad}
          title="Safari Browser"
          style={{
            // These help some sites detect mobile
            minWidth: '100%',
            minHeight: '100%',
          }}
        />

        {/* Loading overlay for visual feedback */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-8 h-8 border-2 border-[#007aff] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}
      </div>

      {/* Address bar */}
      <div className={`px-4 py-2 ${settings.darkMode ? 'bg-[#1c1c1e]' : 'bg-[#f2f2f7]'}`}>
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${settings.darkMode ? 'bg-[#2c2c2e]' : 'bg-white'} shadow-sm`}>
          {inputUrl ? (
            <>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                onBlur={() => !inputUrl && setInputUrl('')}
                autoFocus
                placeholder="搜索或输入网址"
                className={`flex-1 bg-transparent outline-none text-sm ${settings.darkMode ? 'text-white placeholder:text-gray-500' : 'text-black placeholder:text-gray-400'}`}
              />
              <button onClick={() => setInputUrl('')}>
                <X size={16} className="text-gray-400" />
              </button>
            </>
          ) : (
            <button
              className="flex-1 text-center"
              onClick={() => setInputUrl(url)}
            >
              <span className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {displayUrl}
              </span>
            </button>
          )}
          {isLoading && !inputUrl && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw size={16} className={settings.darkMode ? 'text-gray-500' : 'text-gray-400'} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div
        className={`flex items-center justify-around py-3 border-t ${settings.darkMode ? 'bg-[#1c1c1e] border-gray-800' : 'bg-[#f2f2f7] border-gray-200'}`}
        style={{ paddingBottom: DEVICE.safeArea.bottom }}
      >
        <motion.button
          className={canGoBack ? 'text-[#007aff]' : 'text-gray-400'}
          whileTap={{ scale: 0.9 }}
          disabled={!canGoBack}
          onClick={goBack}
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button
          className={canGoForward ? 'text-[#007aff]' : 'text-gray-400'}
          whileTap={{ scale: 0.9 }}
          disabled={!canGoForward}
          onClick={goForward}
        >
          <ChevronRight size={28} />
        </motion.button>
        <motion.button
          className="text-[#007aff]"
          whileTap={{ scale: 0.9 }}
          onClick={handleRefresh}
        >
          <RefreshCw size={22} />
        </motion.button>
        <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
          <BookOpen size={22} />
        </motion.button>
        <motion.button className="text-[#007aff]" whileTap={{ scale: 0.9 }}>
          <Layers size={22} />
        </motion.button>
      </div>
    </div>
  )
}
