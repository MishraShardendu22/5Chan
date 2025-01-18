"use client"
import axios from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";

const MessagingPage = () => {
  const specialChar = "||";

  // Helper function to parse the response messages
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
    if (!messageSent.trim()) return;

    setLoading(true);
    try {
      await axios.post(`/api/send-message`, {
        username,
        message: messageSent,
      });
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to 5Chan Random User !!</h1>
      <p>
        Leave a message for <strong>{username}</strong>
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={fetchMessages}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        disabled={loading}
      />

      {/* Message List */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Suggested Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {msg}
            </li>
          ))}
        </ul>
      </div>

      {/* Message Input */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="Type your message here..."
          value={messageSent}
          onChange={(e) => setMessageSent(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "10px" }}
        ></textarea>
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          disabled={loading}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default MessagingPage;
