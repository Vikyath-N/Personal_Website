"use client";
import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Loader2, Sparkles, Square } from "lucide-react";

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
      const res = await fetch("/api/ask/", {
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
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col" aria-describedby="chat-description">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Ask about Vikyath
            </SheetTitle>
          </SheetHeader>

          <div id="chat-description" className="sr-only">
            Chat interface to ask questions about Vikyath's background, experience, and projects
          </div>
          <div className="flex-1 flex flex-col gap-4 mt-6">
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    Hi! I&apos;m an AI assistant that can answer questions about Vikyath&apos;s background, 
                    experience, skills, and projects. What would you like to know?
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <Badge 
                        key={i}
                        variant="outline" 
                        className="cursor-pointer hover:bg-muted text-xs"
                        onClick={() => askQuestion(q)}
                      >
                        {q}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-96">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-8"
                      : "bg-muted mr-8"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
              
              {loading && (
                <div className="bg-muted p-3 rounded-lg mr-8 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask me anything about Vikyath..."
                className="flex-1 input input-bordered input-sm"
                disabled={loading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!question.trim() || loading}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
              {loading && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={stopStreaming}
                  className="px-3"
                >
                  <Square className="h-4 w-4" />
                </Button>
              )}
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
