# Terminal Portfolio

A distinctive, adaptive terminal-style portfolio website with interactive AI assistant. Built as a single HTML file for easy deployment.

# Portfolio Website
[Live](https://bevinkatti-portfolio.vercel.app/) : 
```https://bevinkatti-portfolio.vercel.app/ ```



## 🎯 Features

- **Pure Terminal Aesthetic** - Authentic command-line interface with keyboard shortcuts, command history, and tab autocomplete
- **Interactive AI Assistant** - Personalized Q&A system trained on portfolio data (15+ question patterns with smart fallback handling)
- **Day/Night Themes** - Toggle between night mode (dark terminal) and warm day mode aesthetic
- **Project Showcase** - Interactive project browser with live demos, GitHub links, and animated benchmark visualizations
- **Zero Dependencies** - Single HTML file, no build step, works offline
- **Mobile Responsive** - Fully functional on mobile with touch-friendly fallbacks

## 🚀 Live Demo

[Your deployed link here]

## 💻 Commands

```bash
whoami              # About me
ls projects         # List all projects
about <project>     # View project details
benchmark <project> # Show metrics with animated bars
ask assistant       # Interactive AI Q&A
demo <project>      # Open live demo
github              # GitHub profile
contact             # LinkedIn + GitHub
theme               # Toggle day/night mode
help                # Show all commands
```

## 🛠️ Tech Stack

- Vanilla JavaScript (no frameworks)
- CSS custom properties for theming
- LocalStorage for theme persistence
- Single-file architecture for portability


## 🎨 Design Philosophy

Built to stand out from typical portfolio templates by combining:
- Terminal authenticity (real command parsing, history, autocomplete)
- AI-powered interactivity (personalized Q&A, not generic chatbot)
- Adaptive UX (warm day mode vs. cyberpunk night mode)
- Performance (single file, <150KB, loads instantly)


## 🔧 Customization

All portfolio data in one object (lines 438-512):
- Projects, skills, experience
- Current focus and challenges
- AI assistant knowledge base

Theme colors in CSS variables (lines 11-36):
- Night mode palette
- Day mode palette

## 📝 License

MIT

---

**Built with** ❤️ **for developers who appreciate terminal aesthetics**