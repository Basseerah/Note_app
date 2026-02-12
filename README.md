# Noted. - Offline-First Notes Application

A modern, Progressive Web Application (PWA) for creating and managing notes with a premium design and full offline capability.

## ✨ Features

- **📝 Full CRUD Operations** - Create, read, update, and delete notes seamlessly
- **🔌 Offline-First** - Works completely without an internet connection
- **💾 Auto-Save** - All changes persist automatically using LocalStorage
- **🎨 Color Coding** - Organize notes with 6 beautiful pastel colors
- **📌 Pin Favorites** - Keep important notes at the top
- **🔍 Real-Time Search** - Instantly find notes by title or content
- **🏷️ Categories** - Organize by Work, Education, Personal, or Home
- **🌓 Dark Mode** - Automatic theme switching with smooth transitions
- **📱 Responsive Design** - Beautiful on desktop, tablet, and mobile
- **📤 Export Data** - Download all notes as JSON backup
- **👁️ Markdown Preview** - Preview formatted text in real-time

## 🛠️ Technologies

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern design with Grid, Flexbox, and animations
- **Vanilla JavaScript** - Zero dependencies, pure ES6+
- **Service Worker** - Offline caching and PWA functionality
- **LocalStorage API** - Client-side data persistence
- **Web App Manifest** - Installable as native app

## 📂 Project Structure

```
note_app/
├── index.html              # Application entry point
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker for offline support
├── css/
│   └── style.css          # Complete styling and animations
└── js/
    └── app.js             # Application logic and state management
```

## 🚀 Quick Start

### Prerequisites
Service Workers require HTTPS or localhost. Use a local development server:

**Option 1: Python**
```bash
python -m http.server 8000
```
Visit: `http://localhost:8000`

**Option 2: Node.js**
```bash
npx http-server .
```
Visit: `http://127.0.0.1:8080`

**Option 3: VS Code**
Use the Live Server extension

## 💡 How It Works

### Data Persistence
- **Storage**: Browser's LocalStorage API
- **Key**: `notes-app-data`
- **Format**: JSON array of note objects
- **Auto-Save**: Every create, update, or delete operation

### Offline Capability
- **Service Worker** caches all static assets
- **Cache-First Strategy**: Instant loading from cache
- **Offline Indicator**: Visual feedback when disconnected
- **No Internet Required**: Full functionality offline

### Note Structure
```javascript
{
  id: 1644678900000,           // Unique timestamp
  title: "My Note",
  content: "Note content...",
  category: "personal",         // work | education | personal | home
  color: "purple",              // default | red | orange | yellow | green | blue | purple
  isPinned: false,              // Favorite status
  createdAt: "2026-02-12T...",
  updatedAt: "2026-02-12T..."
}
```

## 📱 Usage Guide

1. **Create Note**: Click "New Note" button → Fill form → Save
2. **Edit Note**: Click any note card → Modify → Save
3. **Delete Note**: Open note → Click delete icon → Confirm
4. **Search**: Type in search bar for real-time filtering
5. **Filter**: Click category in sidebar to filter notes
6. **Pin Note**: Open note → Click pin icon → Save
7. **Change Color**: Open note → Select color → Save
8. **Toggle Theme**: Click theme button in sidebar
9. **Export Data**: Click export button to download JSON backup

## 🎨 Design Features

- **Premium UI**: Modern, clean interface with smooth animations
- **Glassmorphism**: Subtle blur effects and transparency
- **Micro-interactions**: Hover effects and transitions
- **Typography**: Google Fonts (Outfit family)
- **Color Palette**: Carefully selected pastel colors
- **Accessibility**: ARIA labels and semantic HTML

## 🔒 Privacy & Security

- **100% Local**: All data stays on your device
- **No Tracking**: Zero analytics or external requests
- **No Account**: No login or registration required
- **Full Control**: Export and delete your data anytime

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

*Service Worker and LocalStorage required*

## 📦 Installation as PWA

1. Open the app in a supported browser
2. Look for "Install" prompt or menu option
3. Click "Install" to add to home screen
4. Launch like a native app

## 🤝 Contributing

This is a demonstration project showcasing modern web technologies. Feel free to fork and customize for your needs.

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ using Vanilla JavaScript, HTML5, and CSS3**
