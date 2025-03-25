"use client"

import { useState } from "react"
import { Frown, Meh, Smile } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Mood = "happy" | "neutral" | "sad" | null

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
  }

  const handleSubmit = () => {
    if (selectedMood) {
      setSubmitted(true)
      // In a real app, you would save this to a database
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="mb-4 text-primary">
          {selectedMood === "happy" && <Smile className="h-12 w-12" />}
          {selectedMood === "neutral" && <Meh className="h-12 w-12" />}
          {selectedMood === "sad" && <Frown className="h-12 w-12" />}
        </div>
        <p className="mb-2 text-lg font-medium">Thanks for sharing your mood!</p>
        <p className="text-sm text-muted-foreground">Your entry has been recorded.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setSelectedMood(null)
            setSubmitted(false)
          }}
        >
          Log Another Mood
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">How are you feeling today?</p>
      <div className="flex justify-between">
        <Card
          className={`cursor-pointer p-2 transition-colors hover:bg-primary/5 ${
            selectedMood === "sad" ? "border-primary bg-primary/10" : ""
          }`}
          onClick={() => handleMoodSelect("sad")}
        >
          <CardContent className="flex flex-col items-center justify-center p-2">
            <Frown className={`h-8 w-8 ${selectedMood === "sad" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="mt-1 text-xs">Sad</span>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer p-2 transition-colors hover:bg-primary/5 ${
            selectedMood === "neutral" ? "border-primary bg-primary/10" : ""
          }`}
          onClick={() => handleMoodSelect("neutral")}
        >
          <CardContent className="flex flex-col items-center justify-center p-2">
            <Meh className={`h-8 w-8 ${selectedMood === "neutral" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="mt-1 text-xs">Neutral</span>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer p-2 transition-colors hover:bg-primary/5 ${
            selectedMood === "happy" ? "border-primary bg-primary/10" : ""
          }`}
          onClick={() => handleMoodSelect("happy")}
        >
          <CardContent className="flex flex-col items-center justify-center p-2">
            <Smile className={`h-8 w-8 ${selectedMood === "happy" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="mt-1 text-xs">Happy</span>
          </CardContent>
        </Card>
      </div>
      <Button className="w-full" disabled={!selectedMood} onClick={handleSubmit}>
        Log Mood
      </Button>
    </div>
  )
}

