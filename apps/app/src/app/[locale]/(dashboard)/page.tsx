'use client'

import { useState, useEffect } from 'react'
import { Button } from "@v1/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../../packages/ui/src/components/card"
import { Input } from "../../../../../../packages/ui/src/components/input"
import { Sheet, SheetContent, SheetTrigger } from "../../../../../../packages/ui/src/components/sheet"
import { Github, Cpu, Code, Zap, ExternalLink, Sun, Moon, Linkedin, Twitter, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleAiChat = () => {
    setAiResponse(`Thanks for your message: "${userInput}". As an AI assistant created by Mason, I'm here to help!`)
    setUserInput("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Cpu className="h-6 w-6 mr-2" />
          <span className="font-bold">Mason Dumas</span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
            Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#github">
            GitHub
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#donate">
            Donate
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-auto">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
                Projects
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
                About
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#github">
                GitHub
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#donate">
                Donate
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="justify-start px-2"
              >
                {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                Toggle dark mode
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Mason Dumas
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Indie AI Programmer | Human-AI Symbiosis Explorer
                </p>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Working so closely with AI, I've become a cyborg. Join me on this exciting journey of human-AI collaboration.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild>
                  <Link href="#projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#donate">Support My Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Data Anonymizer</CardTitle>
                  <CardDescription>AI-powered data protection tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/project-screenshots/data-anonymizer.png"
                    alt="Data Anonymizer Screenshot"
                    width={300}
                    height={200}
                    className="rounded-lg mb-4 w-full"
                  />
                  <p>Securely anonymize sensitive data using advanced AI techniques to ensure privacy compliance.</p>
                  <Link href="/anonymizer" passHref>
                    <Button className="mt-4 w-full">Try Data Anonymizer</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Neural Network Visualizer</CardTitle>
                  <CardDescription>Interactive neural network exploration tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/project-screenshots/neural-network-visualizer.png"
                    alt="Neural Network Visualizer Screenshot"
                    width={300}
                    height={200}
                    className="rounded-lg mb-4 w-full"
                  />
                  <p>Helps understand and visualize complex neural network architectures in real-time.</p>
                </CardContent>
              </Card>
              <Card className="sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>AI Ethics Analyzer</CardTitle>
                  <CardDescription>Ethical implications assessment tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/project-screenshots/ai-ethics-analyzer.png"
                    alt="AI Ethics Analyzer Screenshot"
                    width={300}
                    height={200}
                    className="rounded-lg mb-4 w-full"
                  />
                  <p>Evaluates AI systems for potential ethical concerns and biases, promoting responsible AI development.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">About Me</h2>
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400">
                  I'm Mason Dumas, an indie AI programmer with a passion for exploring the boundaries between human intelligence and artificial intelligence. With a background in computer science and cognitive psychology, I've dedicated my career to developing AI systems that enhance human capabilities rather than replace them.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  My philosophy is simple: AI should be a tool for human empowerment. I believe in creating symbiotic relationships between humans and AI, where each complements the other's strengths. This approach has led me to develop innovative projects that showcase the potential of human-AI collaboration.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  When I'm not coding or contemplating the future of AI, you can find me giving talks at tech conferences, contributing to open-source projects, or exploring the latest developments in neurotechnology. Join me in shaping a future where humans and AI work together to solve the world's most pressing challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="github" className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Open Source Contributions</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Check out my latest open-source projects and contributions on GitHub.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" asChild>
                  <a href="https://github.com/masondumas" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub Profile
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="donate" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Support My Work</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your donation helps me continue pushing the boundaries of AI and human collaboration.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Zap className="mr-2 h-4 w-4" />
                    Make a Donation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Try My AI Assistant</h2>
            <div className="max-w-md mx-auto space-y-4">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button onClick={handleAiChat} className="w-full">Send</Button>
              {aiResponse && (
                <Card>
                  <CardHeader>
                    <CardTitle>AI Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{aiResponse}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Mason Dumas. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
        <div className="flex gap-4">
          <a href="https://github.com/masondumas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com/in/masondumas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://twitter.com/masondumas" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  )
}