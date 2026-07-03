const responses = {
  greeting: [
    "Hello! I'm Aurora, your friendly assistant. How can I help you today?",
    "Hey there! Great to meet you. What would you like to talk about?",
    "Hi! I'm here and ready to chat. What's on your mind?",
  ],
  help: [
    "I can chat about anything! Try asking me about the weather, telling me a joke, or just saying hello. I'm always learning.",
    "You can ask me questions, request a joke, check the time, or just have a casual conversation. Type anything!",
  ],
  joke: [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "I told my computer I needed a break… now it won't stop sending me Kit-Kat ads.",
    "There are only 10 types of people in the world: those who understand binary and those who don't.",
  ],
  thanks: [
    "You're welcome! Happy to help anytime.",
    "My pleasure! Feel free to ask me anything else.",
    "Anytime! I'm always here if you need me.",
  ],
  default: [
    "That's interesting! Tell me more about that.",
    "I see what you mean. What else would you like to explore?",
    "Great question! I'm thinking about the best way to respond to that.",
    "Hmm, fascinating topic. Could you elaborate a bit?",
    "I appreciate you sharing that. What would you like to know next?",
  ],
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getBotResponse(message) {
  const text = message.toLowerCase().trim()

  if (/^(hi|hello|hey|howdy|greetings|good morning|good evening|good afternoon)/.test(text)) {
    return pick(responses.greeting)
  }
  if (/help|what can you do|capabilities|features/.test(text)) {
    return pick(responses.help)
  }
  if (/joke|funny|laugh|humor|humour/.test(text)) {
    return pick(responses.joke)
  }
  if (/thank|thanks|thx|appreciate/.test(text)) {
    return pick(responses.thanks)
  }
  if (/time|date|day|today/.test(text)) {
    const now = new Date()
    return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} and the time is ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.`
  }
  if (/weather/.test(text)) {
    return "I don't have live weather data, but I hope it's a beautiful day wherever you are! ☀️"
  }
  if (/who are you|your name|about you/.test(text)) {
    return "I'm Aurora — a sleek chatbot built to help you explore ideas, get quick answers, and have friendly conversations."
  }
  if (/bye|goodbye|see you|later|exit/.test(text)) {
    return "Goodbye! It was lovely chatting with you. Come back anytime! 👋"
  }
  if (/\?/.test(text)) {
    return "That's a thoughtful question. While I'm a demo bot, I'd love to hear your perspective on it too!"
  }

  return pick(responses.default)
}

export const suggestions = [
  "Hello!",
  "Tell me a joke",
  "What can you do?",
  "What time is it?",
]
