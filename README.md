# Aurora Chat

A beautiful, modern chatbot UI built with React and Vite. Dark glassmorphism design with smooth animations, typing indicators, and smart conversational responses.

**[Live Demo](https://viinod9.github.io/aurora-chatbot/)**

![Aurora Chat](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

## Features

- Glassmorphism UI with animated gradient background
- Typing indicator and smooth message animations
- Quick suggestion chips to start conversations
- Smart responses for greetings, jokes, time, help, and more
- Fully responsive — works on desktop and mobile
- One-click deploy to GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on every push to `main`.

1. Create a new public repository on GitHub
2. Push this code to the `main` branch
3. Go to **Settings → Pages** and set **Source** to **GitHub Actions**
4. After the workflow completes, your app will be live at `https://<username>.github.io/<repo-name>/`

## Project structure

```
src/
├── App.jsx       # Main chat UI
├── App.css       # Styling
├── chatbot.js    # Response logic
├── index.css     # Global styles
└── main.jsx      # Entry point
```

## License

MIT — feel free to use, modify, and share.
