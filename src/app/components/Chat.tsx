'use client'
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dotCount, setDotCount] = useState(0); // "Yazıyor..." için nokta sayısı animasyonu
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Loading sırasında "Yazıyor..." animasyonu için interval
  useEffect(() => {
    if (!loading) {
      setDotCount(0);
      return;
    }

    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // 0,1,2,3 nokta sayısı döner
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data?.answer || "Bir hata oluştu.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Bir hata oluştu.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  // Dosya seçildiğinde otomatik gönder
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    // Kullanıcıya dosya gönderiliyor mesajı ekle
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: `📎 ${file.name} gönderiliyor...`,
      },
    ]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Yükleme başarısız");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: data?.message || `${file.name} başarıyla yüklendi.`,
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Dosya yüklenirken bir hata oluştu.",
        },
      ]);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Attach ikonuna tıklayınca dosya seçici açılsın
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-screen border border-gray-200 flex flex-col bg-gray-50 shadow-md relative">
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`
              max-w-[75%] px-4 py-2 rounded-2xl text-base break-words mb-1
              ${msg.sender === "user"
                ? "self-end bg-blue-600 text-white"
                : "self-start bg-gray-200 text-gray-900"}
            `}
          >
            {msg.text}
          </div>
        ))}

        {/* Bot yazıyor animasyonu */}
        {loading && (
          <div className="max-w-[75%] px-4 py-2 rounded-2xl text-base break-words mb-1 self-start bg-gray-200 text-gray-900">
            Yazıyor{'.'.repeat(dotCount)}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex border-t border-gray-100 p-3 bg-white items-center sticky bottom-0">
        {/* Attach icon */}
        <button
          type="button"
          className="mr-2 p-2 rounded-full hover:bg-gray-200"
          onClick={handleAttachClick}
          disabled={loading}
          aria-label="Dosya ekle"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21.44 11.05l-8.49 8.49a5.25 5.25 0 01-7.43-7.43l9.19-9.19a3.25 3.25 0 014.6 4.6l-9.19 9.19a1.25 1.25 0 01-1.77-1.77l8.49-8.49" />
          </svg>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />

        <input
          className="flex-1 text-base px-3 py-2 rounded-full border border-gray-300 outline-none mr-2"
          type="text"
          placeholder="Bir soru yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          className="px-5 py-2 rounded-full border-none bg-blue-600 text-white font-semibold cursor-pointer text-base disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Chat;
