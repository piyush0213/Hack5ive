import Link from "next/link"
import { ArrowRight, Brain, HeartPulse, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Brain className="h-6 w-6 text-primary" />
            <span>MindfulCare</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32 text-center">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
          Your mental wellness journey starts here
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Your Mental Wellness, <span className="text-primary">Our Priority</span>
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Experience personalized mental health support with our AI-powered platform. Track your progress, chat with our
          supportive assistant, and access guided exercises.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/signup">
            <Button size="lg" className="gap-1.5">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/assessment">
            <Button size="lg" variant="outline">
              Take Assessment
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-12 md:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
          <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform offers a comprehensive suite of tools to support your mental wellness journey.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-none lg:grid-cols-3 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>AI Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Take our comprehensive psychological assessment to get personalized insights and recommendations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Guided Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access a library of guided meditation and stress-relief exercises tailored to your needs.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <HeartPulse className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your mental wellness journey with interactive charts and personalized insights.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-12 md:py-24">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Start Your Journey Today</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of users who have improved their mental wellness with our platform.
          </p>
          <Link href="/signup">
            <Button size="lg" className="mt-4">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <Brain className="h-5 w-5 text-primary" />
            <span>MindfulCare</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MindfulCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

