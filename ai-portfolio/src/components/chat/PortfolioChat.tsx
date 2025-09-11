"use client";
import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Loader2, Sparkles, Square, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's Vikyath's background?",
  "Tell me about his AI experience",
  "What technologies does he work with?",
  "What projects has he built?",
  "What is his education background?"
];

export default function PortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const streamAsk = async (questionToAsk?: string) => {
    setLoading(true);
    const currentQuestion = questionToAsk || question;
    const userMessage: Message = { role: "user", content: currentQuestion };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");

    // Add empty assistant message that we'll populate
    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages(prev => [...prev, assistantMessage]);

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      // Use non-streaming endpoint for reliability
      const envBase = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL || "";
      const fallbackWorker = typeof window !== 'undefined' && window.location.host.endsWith('vikyath.me')
        ? 'https://vikyath-chat-api.v-naradasi.workers.dev'
        : '';
      const base = envBase || fallbackWorker;
      const url = base ? `${base.replace(/\/$/, '')}/api/ask/` : "/api/ask/";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ question: currentQuestion }),
        signal: controllerRef.current.signal,
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      
      if (data.answer) {
        // Simulate streaming by adding text progressively
        const answer = data.answer;
        let currentText = "";
        
        for (let i = 0; i < answer.length; i++) {
          if (controllerRef.current?.signal.aborted) break;
          
          currentText += answer[i];
          setMessages(prev =>
            prev.map((msg, idx) =>
              idx === prev.length - 1 && msg.role === "assistant"
                ? { ...msg, content: currentText }
                : msg
            )
          );
          
          // Small delay to simulate streaming
          await new Promise(resolve => setTimeout(resolve, 20));
        }
      } else {
        setMessages(prev =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 && msg.role === "assistant"
              ? { ...msg, content: "Sorry, I couldn't generate a response." }
              : msg
          )
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setMessages(prev =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 && msg.role === "assistant"
              ? { ...msg, content: "Sorry, I encountered an error. Please try again." }
              : msg
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (q?: string) => {
    const questionToAsk = q || question;
    if (!questionToAsk.trim() || loading) return;

    setQuestion("");
    streamAsk(questionToAsk);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askQuestion();
  };

  const stopStreaming = () => {
    controllerRef.current?.abort();
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            size="lg" 
            className="h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[420px] sm:w-[580px] flex flex-col p-0 bg-gray-50 dark:bg-gray-900" aria-describedby="chat-description">
          <SheetTitle className="sr-only">Ask about Vikyath</SheetTitle>
          {/* iOS-like Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">Ask about Vikyath</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</p>
            </div>
          </div>

          <div id="chat-description" className="sr-only">
            Chat interface to ask questions about Vikyath&apos;s background, experience, and projects
          </div>
          
          <div className="flex-1 flex flex-col">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="p-6 space-y-6">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Hi there! 👋</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      I&apos;m your AI assistant. Ask me anything about Vikyath&apos;s background, 
                      experience, skills, and projects!
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Try asking:</p>
                  <div className="grid gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        className="text-left p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm text-gray-700 dark:text-gray-300 hover:shadow-sm"
                        onClick={() => askQuestion(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-bl-md shadow-sm"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            code: ({ children }) => (
                              <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg overflow-x-auto text-xs">
                                {children}
                              </pre>
                            ),
                            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask me anything about Vikyath..."
                    className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!question.trim() || loading}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {loading && (
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={stopStreaming}
                    className="h-12 w-12 rounded-full p-0"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
