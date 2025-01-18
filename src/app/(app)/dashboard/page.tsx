"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

const Page = () => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string>("");

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
      await fetchAccept();
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

  const fetchAccept = async () => {
    try {
      const res = await axios.get("/api/accept-message");
      setAccept(res.data.accept);
    } catch (error) {
      console.error("Error fetching accept status:", error);
      toast({
        title: "Error",
        description: "Failed to fetch accept status.",
        variant: "destructive",
      });
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

  const handleSwitch = async () => {
    setIsSwitching(true);
    try {
      const res = await axios.post("/api/accept-message", { accept: !accept });
      setAccept(res.data.accept);
      toast({
        title: "Success",
        description: `Messages ${!accept ? "enabled" : "disabled"}.`,
      });
    } catch (error) {
      console.error("Error switching accept status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div>
      <div>
        <p>{profileUrl}</p>
        <button onClick={copyToClipBoard}>Copy</button>
      </div>
      <div>
        <button onClick={handleSwitch} disabled={isSwitching}>
          {accept ? "Disable" : "Enable"}
        </button>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : messages && messages.length > 0 ? (
          <div>
            {messages.map((message) => (
              <div key={message._id}>
                <p>{message.content}</p>
                <div>
                  {dayjs(message?.createdAt).format('MMM D, YYYY h:mm A')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No messages available.</div>
        )}
      </div>
    </div>
  );
};

export default Page;
