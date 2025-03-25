"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, Brain, Calendar, ChevronDown, Home, MessageSquare, Moon, Settings, Sun, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoodTracker } from "@/components/mood-tracker"
import { ProgressChart } from "@/components/progress-chart"
import { RecommendationCard } from "@/components/recommendation-card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Dashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-3">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">MindfulCare</span>
            </div>
            <Separator />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/chat">
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat Assistant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/exercises">
                    <Activity className="h-4 w-4" />
                    <span>Exercises</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/calendar">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Separator />
            <div className="p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    <span>
                      {typeof window !== "undefined" && localStorage.getItem("user")
                        ? JSON.parse(localStorage.getItem("user") || "{}").name
                        : "John Doe"}
                    </span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "light" ? (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("isAuthenticated")
                      localStorage.removeItem("user")
                      window.location.href = "/signin"
                    }}
                  >
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <Button variant="outline" size="sm" className="gap-1" onClick={toggleTheme}>
              {theme === "light" ? (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline-block">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only md:inline-block">Light Mode</span>
                </>
              )}
            </Button>
          </header>

          <main className="container py-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Mood Tracker</CardTitle>
                  <CardDescription>Track your daily mood</CardDescription>
                </CardHeader>
                <CardContent>
                  <MoodTracker />
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Progress Overview</CardTitle>
                  <CardDescription>Your wellness journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressChart />
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="recommendations">
                <TabsList>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="exercises">Exercises</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="recommendations" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <RecommendationCard
                      title="Morning Meditation"
                      description="Start your day with a 10-minute guided meditation to center yourself."
                      icon={<Sun className="h-5 w-5" />}
                      actionLabel="Start Now"
                    />
                    <RecommendationCard
                      title="Stress Relief Exercise"
                      description="Try this breathing technique when you feel overwhelmed or anxious."
                      icon={<Activity className="h-5 w-5" />}
                      actionLabel="View Exercise"
                    />
                    <RecommendationCard
                      title="Evening Reflection"
                      description="End your day with a guided reflection to process your thoughts."
                      icon={<Moon className="h-5 w-5" />}
                      actionLabel="Start Now"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="exercises" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <RecommendationCard
                      title="Deep Breathing"
                      description="A simple breathing exercise to help reduce stress and anxiety."
                      icon={<Activity className="h-5 w-5" />}
                      actionLabel="Start Exercise"
                    />
                    <RecommendationCard
                      title="Progressive Muscle Relaxation"
                      description="Relieve physical tension with this guided relaxation technique."
                      icon={<Activity className="h-5 w-5" />}
                      actionLabel="Start Exercise"
                    />
                    <RecommendationCard
                      title="Mindful Walking"
                      description="Practice mindfulness while walking to clear your mind and reduce stress."
                      icon={<Activity className="h-5 w-5" />}
                      actionLabel="Start Exercise"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="insights" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sleep Quality</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Your sleep quality has improved by 15% over the past week. Continue with your evening routine.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Stress Levels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Your stress levels tend to peak on Wednesdays. Consider scheduling relaxation exercises
                          midweek.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Mood Patterns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Your mood improves after meditation sessions. We recommend increasing frequency to daily
                          practice.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

