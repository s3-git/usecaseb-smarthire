import { useState, useRef, useEffect } from "react"
import { Send, User, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSocket } from "./useSocket"
import { getCurrentUser } from "@/api/auth"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  isRead: boolean
  isSent: boolean
}

export default function MessagesTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUser = getCurrentUser()

  // Initialize socket connection
  const { sendMessage } = useSocket({
    onMessage: (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    },
    onConnectionChange: (connected: boolean) => {
      setIsConnected(connected)
    }
  })

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load initial welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      senderId: "system",
      senderName: "TA Team",
      content: "Hello! 👋 I'm here to help you with your job application. Feel free to ask any questions!",
      timestamp: new Date(),
      isRead: true,
      isSent: true
    }
    setMessages([welcomeMessage])
  }, [])

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim()
    if (!trimmedMessage || !currentUser) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: trimmedMessage,
      timestamp: new Date(),
      isRead: false,
      isSent: false
    }

    // Optimistically add message to UI
    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Send message through socket
    sendMessage(newMessage)

    // Mark as sent after a delay (simulating network)
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, isSent: true } : msg)))
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Connection Status */}
      <div
        className={`px-4 py-2 text-xs ${isConnected ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
      >
        {isConnected ? "● Connected" : "● Connecting..."}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser?.id
          const isSystem = message.senderId === "system"

          return (
            <div key={message.id} className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              {!isSystem && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCurrentUser ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
              )}

              {/* Message Content */}
              <div className={`flex-1 ${isCurrentUser ? "flex justify-end" : ""}`}>
                {/* Sender Name */}
                {!isSystem && !isCurrentUser && <p className="text-xs text-gray-500 mb-1 ml-1">{message.senderName}</p>}

                <div
                  className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                    isSystem
                      ? "bg-gray-200 text-gray-700 mx-auto"
                      : isCurrentUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                  {/* Timestamp and Status */}
                  <div
                    className={`flex items-center gap-1 mt-1 text-xs ${
                      isCurrentUser ? "text-blue-100 justify-end" : "text-gray-500"
                    }`}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    {isCurrentUser && (
                      <CheckCheck className={`w-3 h-3 ${message.isRead ? "text-blue-200" : "text-blue-300"}`} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-end gap-2">
          {/* Message Input */}
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] max-h-[100px]"
            rows={1}
            disabled={!isConnected}
          />

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || !isConnected}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-2">Chat directly with our Talent Acquisition team</p>
      </div>
    </div>
  )
}
