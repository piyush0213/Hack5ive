"use client"

import { useState } from "react"
import { Brain, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatMessage } from "@/components/chat-message"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your mental wellness assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
]

const guidedExercises = [
  {
    id: "meditation",
    title: "Guided Meditation",
    description: "A 5-minute meditation to help you relax and center yourself.",
  },
  {
    id: "breathing",
    title: "Deep Breathing Exercise",
    description: "A simple breathing technique to reduce stress and anxiety.",
  },
  {
    id: "gratitude",
    title: "Gratitude Practice",
    description: "A guided exercise to focus on things you're grateful for.",
  },
  {
    id: "body-scan",
    title: "Body Scan Relaxation",
    description: "A progressive relaxation technique to release tension.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [activeExercise, setActiveExercise] = useState<string | null>(null)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(input),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const getAssistantResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
      return "I'm sorry to hear you're feeling anxious. Would you like to try a breathing exercise to help calm your mind? You can find it in the Exercises tab."
    } else if (lowerMessage.includes("sad") || lowerMessage.includes("depressed")) {
      return "I understand that feeling sad can be difficult. Consider trying our gratitude practice, which can help shift your focus to positive aspects of your life."
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) {
      return "Sleep difficulties can be challenging. Our body scan relaxation exercise might help you prepare for better sleep by releasing tension."
    } else if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelmed")) {
      return "It sounds like you're dealing with a lot right now. Our guided meditation could help you find some calm amidst the stress."
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How are you feeling today? I'm here to support your mental wellness journey."
    } else {
      return "Thank you for sharing. Remember that your feelings are valid, and it's okay to seek support. Would you like to explore any of our guided exercises to help with what you're experiencing?"
    }
  }

  const startExercise = (exerciseId: string) => {
    setActiveExercise(exerciseId)

    // Add a message about starting the exercise
    const assistantMessage: Message = {
      id: Date.now().toString(),
      content: `Let's begin the ${guidedExercises.find((ex) => ex.id === exerciseId)?.title}. Find a comfortable position and we'll start when you're ready.`,
      role: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">Mental Wellness Assistant</h1>
        </div>
      </header>

      <Tabs defaultValue="chat" className="flex flex-1 flex-col">
        <div className="border-b px-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 p-0 data-[state=active]:flex data-[state=active]:flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.role === "user"}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="flex-1 p-4 data-[state=active]:flex data-[state=active]:flex-col">
          {activeExercise ? (
            <div className="flex flex-1 flex-col">
              <Button variant="ghost" className="mb-4 w-fit" onClick={() => setActiveExercise(null)}>
                ← Back to exercises
              </Button>

              <Card className="flex flex-1 flex-col p-6">
                <h2 className="mb-4 text-xl font-semibold">
                  {guidedExercises.find((ex) => ex.id === activeExercise)?.title}
                </h2>

                <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
                  <p className="text-lg">
                    {activeExercise === "meditation" &&
                      "Close your eyes and focus on your breath. Breathe in slowly for 4 counts, hold for 2, and exhale for 6 counts."}
                    {activeExercise === "breathing" &&
                      "Place one hand on your chest and one on your stomach. Breathe deeply through your nose, feeling your stomach expand."}
                    {activeExercise === "gratitude" &&
                      "Think of three things you're grateful for today. Visualize each one and notice how it makes you feel."}
                    {activeExercise === "body-scan" &&
                      "Starting from your toes, gradually bring awareness to each part of your body, noticing any tension and letting it go."}
                  </p>

                  <div className="relative h-32 w-32 rounded-full border-4 border-primary">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-semibold">Breathe</span>
                    </div>
                  </div>

                  <Button className="mt-4" onClick={() => setActiveExercise(null)}>
                    Complete Exercise
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {guidedExercises.map((exercise) => (
                <Card key={exercise.id} className="p-4">
                  <h3 className="text-lg font-medium">{exercise.title}</h3>
                  <p className="mt-2 text-muted-foreground">{exercise.description}</p>
                  <Button className="mt-4" onClick={() => startExercise(exercise.id)}>
                    Start Exercise
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

