import { format } from "date-fns"
import { Brain } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8">
        {isUser ? (
          <>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback className="bg-primary/10 text-primary">
              <Brain className="h-4 w-4" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className={`flex max-w-[80%] flex-col ${isUser ? "items-end" : ""}`}>
        <div className={`rounded-lg px-4 py-2 ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="mt-1 text-xs text-muted-foreground">{format(timestamp, "h:mm a")}</span>
      </div>
    </div>
  )
}

