import { useEffect, useState, useCallback } from "react"
import { io, Socket } from "socket.io-client"
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

interface UseSocketProps {
  onMessage: (message: ChatMessage) => void
  onConnectionChange: (connected: boolean) => void
}

interface UseSocketReturn {
  sendMessage: (message: ChatMessage) => void
  isConnected: boolean
  socket: Socket | null
}

// Socket configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001"

export function useSocket({ onMessage, onConnectionChange }: UseSocketProps): UseSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) return

    // Initialize socket connection
    const newSocket = io(SOCKET_URL, {
      auth: {
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.accountType
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    // Connection events
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id)
      setIsConnected(true)
      onConnectionChange(true)
    })

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsConnected(false)
      onConnectionChange(false)
    })

    newSocket.on("connect_error", (error: Error) => {
      console.error("Socket connection error:", error)
      setIsConnected(false)
      onConnectionChange(false)
    })

    // Message events
    newSocket.on(
      "message:receive",
      (message: { id: string; senderId: string; senderName: string; content: string; timestamp: string }) => {
        const receivedMessage: ChatMessage = {
          id: message.id,
          senderId: message.senderId,
          senderName: message.senderName,
          content: message.content,
          timestamp: new Date(message.timestamp),
          isRead: false,
          isSent: true
        }
        onMessage(receivedMessage)
      }
    )

    // Typing events
    newSocket.on("typing:start", (data: { userId: string; userName: string }) => {
      console.log(`${data.userName} is typing...`)
      // Handle typing indicator in the future
    })

    newSocket.on("typing:stop", (data: { userId: string }) => {
      console.log(`User ${data.userId} stopped typing`)
      // Handle typing indicator in the future
    })

    // Read receipt events
    newSocket.on("message:read", (data: { messageId: string }) => {
      console.log(`Message ${data.messageId} was read`)
      // Handle read receipts in the future
    })

    setSocket(newSocket)

    // Cleanup on unmount
    return () => {
      newSocket.close()
    }
  }, [onMessage, onConnectionChange])

  const sendMessage = useCallback(
    (message: ChatMessage) => {
      if (!socket || !isConnected) {
        console.error("Socket not connected")
        return
      }

      socket.emit("message:send", {
        id: message.id,
        senderId: message.senderId,
        senderName: message.senderName,
        content: message.content,
        timestamp: message.timestamp.toISOString()
      })
    },
    [socket, isConnected]
  )

  return {
    sendMessage,
    isConnected,
    socket
  }
}
