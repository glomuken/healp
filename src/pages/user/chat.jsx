import React, { useState, useRef, useEffect } from "react";

const mockReplies = {
  hi: "Hey there! How can I assist you today?",
  hello: "Hello! 😊",
  symptoms: "Please tell me what you're experiencing.",
  emergency: "Call 911 or visit your nearest hospital immediately.",
  default: "I'm not sure how to respond to that. Try saying 'hi'."
};

export default function ChatUI({ userName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: userName || "You",
      text: input,
      time: new Date().toLocaleTimeString()
    };
    const replyText = mockReplies[input.toLowerCase()] || mockReplies.default;

    const botMessage = {
      sender: "Bot",
      text: replyText,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "white",
        borderRadius: "10px",
        height: "60vh",
        padding: "1rem"
      }}
    >
      {/* Message List */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          marginBottom: "1rem"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "10px",
              backgroundColor:
                msg.sender === "Bot"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.2)",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            <strong>{msg.sender}</strong> •{" "}
            <span style={{ fontSize: "0.8rem" }}>{msg.time}</span>
            <div>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div style={{ display: "flex" }}>
        <input
          className="border px-3 py-2 rounded w-full text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
