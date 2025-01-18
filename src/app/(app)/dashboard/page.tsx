/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import dayjs from "dayjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Copy,
  Trash2,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

const MessageSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i}>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex items-center justify-between mt-4">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </Button>
    <span className="text-sm text-muted-foreground">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </Button>
  </div>
);

const MessageList = ({
  messages,
  currentPage,
  onPageChange,
  handleDelete,
}: {
  messages: Message[];
  currentPage: number;
  onPageChange: (page: number) => void;
  handleDelete: (messageId: string) => void;
}) => {
  const messagesPerPage = 3;
  const startIndex = (currentPage - 1) * messagesPerPage;
  const paginatedMessages = messages.slice(startIndex, startIndex + messagesPerPage);

  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3,
  };

  return (
    <div>
      {paginatedMessages.length > 0 ? (
        <div className="space-y-4">
          {paginatedMessages.map((message) => (
            <Card key={message._id} className="group hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed">Message by : <strong>{uniqueNamesGenerator(customConfig)}</strong></p>
                  <p className="text-lg leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{dayjs(message?.createdAt).format("MMM D, YYYY h:mm A")}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(message._id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(messages.length / messagesPerPage)}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <Alert>
          <AlertDescription>No messages available.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

const Page = () => {
  const [messages, setMessages] = useState<Message[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { toast } = useToast();
  const { data: session } = useSession();
  const username = session?.user?.username || "unknown";

  useEffect(() => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    setProfileUrl(`${baseUrl}/u/${username}`);
  }, [username]);

  useEffect(() => {
    const initialize = async () => {
      await fetchMessages();
      setLoading(false);
    };
    initialize();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/get-message");
      setMessages(res.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch messages.",
        variant: "destructive",
      });
      setMessages([]);
    }
  };


  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast({
        title: "Copied!",
        description: "Profile URL copied to clipboard.",
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      const res = await axios.post("/api/delete-message", {
        id: session?.user?._id,
        messageId: messageId,
      });
      toast({
        title: "Success",
        description: res.data.message,
      });
      await fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Message Dashboard</span>
          </CardTitle>

          {/* Profile URL Section */}
          <div className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-lg">
            <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground truncate flex-1">{profileUrl}</p>
            <Button variant="outline" size="sm" onClick={copyToClipBoard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Messages</h2>
        {loading ? (
          <MessageSkeleton />
        ) : messages && messages.length > 0 ? (
          <MessageList
            messages={messages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            handleDelete={handleDelete}
          />
        ) : (
          <Alert>
            <AlertDescription>No messages available.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Page;