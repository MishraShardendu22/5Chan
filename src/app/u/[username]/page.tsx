"use client"
import axios from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import { MessageCircle, Send, RefreshCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const MessageSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-4 bg-muted/50">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </Card>
    ))}
  </div>
);

const MessagingPage = () => {
  const specialChar = "||";
  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split(specialChar);
  };

  const params = useParams<{ username: string }>();
  const username = params.username;

  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    setMessages([]);
    try {
      const response = await axios.post(`/api/suggest-message`);
      console.log("response", response);
      setMessages(parseStringMessages(response.data.data));
    } catch (err) {
      setError("Error fetching messages");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }

  const sendMessage = async () => {
    setLoading(true);
    try {
      console.log("CP-1")
      await axios.post('/api/send-message', {
        username,
        content: messageSent,
      });
      console.log("CP-2")
      setMessageSent("");
      alert("Message sent successfully!");
    } catch (err) {
      setError("Error sending message");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <MessageCircle className="w-6 h-6" />
            5Chan Random User
          </CardTitle>
          <CardDescription className="text-lg">
            Leave a message for <span className="font-semibold text-primary">{username}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Refresh Button */}
          <Button
            onClick={fetchMessages}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Get Message Suggestions
          </Button>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Message List with Skeleton Loading */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Suggested Messages:</h2>
            {loading ? (
              <MessageSkeleton />
            ) : (
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <Card key={index} className="p-4 bg-muted/50">
                    <p className="text-sm">{msg}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="space-y-4">
            {loading ? (
              <Skeleton className="w-full h-[120px] rounded-md" />
            ) : (
              <Textarea
                placeholder="Type your message here..."
                value={messageSent}
                onChange={(e) => setMessageSent(e.target.value)}
                className="min-h-[120px]"
              />
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={sendMessage}
            disabled={loading || !messageSent.trim()}
            className="w-full"
          >
            {loading ? (
              <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MessagingPage;