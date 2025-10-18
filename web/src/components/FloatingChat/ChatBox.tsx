import { useState } from "react"
import { X, Bot, MessageSquare } from "lucide-react"
import ChatBotTab from "./ChatBotTab"
import MessagesTab from "./MessagesTab"

type TabType = "chatbot" | "messages"

interface ChatBoxProps {
  onClose: () => void
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [activeTab, setActiveTab] = useState<TabType>("chatbot")

  return (
    <div className="w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Smart Assistant</h3>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-800 rounded-full p-1 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveTab("chatbot")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "chatbot"
              ? "bg-white text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Bot className="w-4 h-4" />
          ChatBot
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "messages"
              ? "bg-white text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Messages
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">{activeTab === "chatbot" ? <ChatBotTab /> : <MessagesTab />}</div>
    </div>
  )
}
