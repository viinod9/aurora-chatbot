import { useState, useRef, useEffect } from 'react'
import { getBotResponse, suggestions } from './chatbot'
import './App.css'

function BotAvatar() {
  return (
    <div className="avatar avatar-bot" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1h-1.5a2.5 2.5 0 0 0-5 0H12a2.5 2.5 0 0 0-5 0H5.5a2.5 2.5 0 0 0-5 0V14a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z" />
        <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
      </svg>
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="avatar avatar-user" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="message-row bot">
      <BotAvatar />
      <div className="bubble bubble-bot typing">
        <span /><span /><span />
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isBot = msg.role === 'bot'
  return (
    <div className={`message-row ${msg.role}`}>
      {isBot ? <BotAvatar /> : <UserAvatar />}
      <div className={`bubble bubble-${msg.role}`}>
        <p>{msg.text}</p>
        <time>{msg.time}</time>
      </div>
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'bot',
      text: "Hi! I'm Aurora ✨ Your personal chat companion. Ask me anything or pick a suggestion below!",
      time: formatTime(new Date()),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: formatTime(new Date()),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const delay = 600 + Math.random() * 800
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: getBotResponse(trimmed),
        time: formatTime(new Date()),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, delay)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  function handleSuggestion(text) {
    sendMessage(text)
    inputRef.current?.focus()
  }

  return (
    <div className="app">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="chat-container">
        <header className="chat-header">
          <div className="header-info">
            <div className="header-avatar">
              <BotAvatar />
              <span className="status-dot" title="Online" />
            </div>
            <div>
              <h1>Aurora</h1>
              <p>Always here to help</p>
            </div>
          </div>
          <button
            type="button"
            className="clear-btn"
            onClick={() =>
              setMessages([
                {
                  id: 0,
                  role: 'bot',
                  text: "Fresh start! How can I help you today?",
                  time: formatTime(new Date()),
                },
              ])
            }
            title="Clear chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
            </svg>
          </button>
        </header>

        <main className="chat-messages">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </main>

        {messages.length <= 1 && !isTyping && (
          <div className="suggestions">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            disabled={isTyping}
          />
          <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.52.86v16.08a1 1 0 0 0 1.52.86z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
