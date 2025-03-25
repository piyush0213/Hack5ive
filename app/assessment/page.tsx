"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const questions = [
  {
    id: 1,
    question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    question: "Over the past 2 weeks, how often have you had little interest or pleasure in doing things?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    question: "Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 4,
    question: "Over the past 2 weeks, how often have you felt tired or had little energy?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 5,
    question: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
]

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="mx-auto flex w-full max-w-[600px] flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Mental Health Assessment</h1>
          <p className="text-sm text-muted-foreground">
            Answer these questions honestly to help us understand your mental wellness needs
          </p>
        </div>

        {!completed ? (
          <Card>
            <CardHeader>
              <CardTitle>
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
              <CardDescription>{questions[currentQuestion].question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
                {currentQuestion < questions.length - 1 ? "Next" : "Complete"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Assessment Completed
              </CardTitle>
              <CardDescription>Thank you for completing the assessment. We've analyzed your responses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Based on your responses, we've prepared personalized recommendations for your mental wellness journey.
              </p>
              <Separator />
              <div className="rounded-lg bg-primary/10 p-4">
                <h3 className="font-medium text-primary">Your Next Steps</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    <span>Explore guided meditation exercises in our library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    <span>Chat with our AI assistant for personalized support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    <span>Track your mood daily to monitor your progress</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button className="w-full gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentQuestion
                  ? "bg-primary"
                  : index < currentQuestion || completed
                    ? "bg-primary/60"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

