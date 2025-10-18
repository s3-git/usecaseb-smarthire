import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import ChatBox from "./ChatBox"

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setHasUnreadMessages(false)
    }
  }

  return (
    <>
      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <ChatBox onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {hasUnreadMessages && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </>
        )}
      </button>
    </>
  )
}
