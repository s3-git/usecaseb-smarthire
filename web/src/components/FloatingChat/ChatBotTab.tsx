import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchOpenJobs, sendChatMessage } from "./chatbotApi"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  jobs?: Array<{
    id: string
    title: string
    company: string
    location: string
  }>
}

export default function ChatBotTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      type: "bot",
      content: "Welcome to Human Resource Agent. We will answer your queries on HR related matters.",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleDefaultPrompt = async () => {
    await handleSendMessage("Show me all opening jobs?")
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim()
    if (!textToSend && !selectedFile) return

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: selectedFile ? `${textToSend} [Attached: ${selectedFile.name}]` : textToSend,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setSelectedFile(null)
    setIsLoading(true)

    try {
      // Check if asking for jobs
      if (textToSend.toLowerCase().includes("opening jobs") || textToSend.toLowerCase().includes("job openings")) {
        const jobs = await fetchOpenJobs()
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `I found ${jobs.length} open positions for you:`,
          timestamp: new Date(),
          jobs
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        // General chatbot response
        const response = await sendChatMessage(textToSend, selectedFile)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: response,
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ]
      if (validTypes.includes(file.type)) {
        setSelectedFile(file)
      } else {
        alert("Please upload a PDF or Word document")
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "bot" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"
              }`}
            >
              {message.type === "bot" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>

            {/* Message Content */}
            <div className={`flex-1 ${message.type === "user" ? "flex justify-end" : ""}`}>
              <div
                className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === "bot" ? "bg-white border border-gray-200" : "bg-blue-600 text-white"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                {/* Job Listings */}
                {message.jobs && message.jobs.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm">{job.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{job.company}</p>
                        <p className="text-xs text-gray-500 mt-1">{job.location}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
          </div>
        )}

        {/* Default Prompt Button (shown after welcome message) */}
        {messages.length === 1 && !isLoading && (
          <div className="flex justify-center">
            <button
              onClick={handleDefaultPrompt}
              className="bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
            >
              Show me all opening jobs?
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        {/* Selected File Display */}
        {selectedFile && (
          <div className="mb-2 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-2">
            <Paperclip className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-900 flex-1 truncate">{selectedFile.name}</span>
            <button onClick={() => setSelectedFile(null)} className="text-blue-600 hover:text-blue-800">
              ×
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* File Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0"
            title="Upload CV"
          >
            <Paperclip className="w-4 h-4" />
          </Button>

          {/* Message Input */}
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] max-h-[100px]"
            rows={1}
          />

          {/* Send Button */}
          <Button
            onClick={() => handleSendMessage()}
            disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
            size="icon"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Upload your CV (PDF, DOC, DOCX) for personalized job recommendations
        </p>
      </div>
    </div>
  )
}
