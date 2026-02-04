# Offline-First Notes Application

A premium, responsive, and offline-capable notes application built with Vanilla JavaScript, HTML5, and CSS3.

## 🚀 Features

- **Create, Read, Update, Delete (CRUD)**: Manage your notes easily.
- **Offline First**: Works completely without an internet connection.
- **LocalStorage Persistence**: Data is saved automatically and persists across page reloads and browser restarts.
- **Responsive Design**: Looks great on desktop and mobile.
- **Dark Mode Support**: Automatically adapts to your system's color scheme.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties (variables), Flexbox, Grid, and Animations.
- **JavaScript (Vanilla)**: Core logic without dependencies.
- **Service Worker**: Caching assets for offline access.
- **LocalStorage**: Client-side data persistence.

## 📂 Project Structure

```
note_app/
│── index.html       # Main application entry point
│── sw.js            # Service Worker for offline caching
│── README.md        # Documentation
│── css/
│   └── style.css    # Premium styling
│── js/
│   └── app.js       # Application logic
```

## 💾 LocalStorage Logic

The application uses the browser's `localStorage` API to persist data.
- **Keys**: We use `notes-app-data` to store the array of note objects.
- **Format**: Data is stored as a JSON string.
- **Operations**:
  - `loadNotes()`: Retrieves and parses the JSON string on startup.
  - `saveNotes()`: Serializes the current notes array and saves it whenever a change occurs (add, edit, delete).

## 🌐 Offline Strategy

We use a **Service Worker** (`sw.js`) to cache essential assets:
- `index.html`
- `css/style.css`
- `js/app.js`

**Caching Strategy**: Cache-First (or Stale-While-Revalidate logic depending on implementation nuances, here we use a logic to serve from cache if available, else network and cache).
- When you load the app, it tries to serve files from the cache.
- If you are offline, the app loads from the cache instantly.
- An **Offline Indicator** appears automatically when the network connection is lost.

## 🏃box How to Run

Since Service Workers require a secure context (HTTPS) or localhost, you must serve this application using a local server.

1. **Using Python**:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

2. **Using Node.js (http-server)**:
   ```bash
   npx http-server .
   ```
   Then visit the URL provided (usually `http://127.0.0.1:8080`).

## 📸 Usage

1. Click **"New Note"** to create a note.
2. Fill in the title and content.
3. Click **"Save"**.
4. To **Edit**, click on any existing note card.
5. To **Delete**, click a note to open it, then click "Delete" (requires confirmation).
