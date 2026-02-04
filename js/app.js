/**
 * Notes App Logic
 * Premium Dashboard Edition
 */

// DOM Elements
const notesList = document.getElementById('notes-list');
const addNoteBtn = document.getElementById('add-note-btn');
const modal = document.getElementById('note-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const noteForm = document.getElementById('note-form');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const noteIdInput = document.getElementById('note-id');
const noteCategoryInput = document.getElementById('note-category');
const deleteBtn = document.getElementById('delete-note-btn');
const modalTitle = document.getElementById('modal-title');
const lastEditedSpan = document.getElementById('last-edited');

// New DOM Elements
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const exportBtn = document.getElementById('export-btn');
const pinNoteBtn = document.getElementById('pin-note-btn');
const previewBtn = document.getElementById('preview-btn');
const notePreview = document.getElementById('note-preview');
const colorOptions = document.querySelectorAll('.color-option');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const noteCountBadge = document.getElementById('note-count');

// State
let notes = [];
let currentFilter = 'all'; // all, pinned, work, personal, education, home
let currentNoteState = {
    isPinned: false,
    color: 'default',
    isPreviewMode: false
};

// Initialize
function init() {
    loadNotes();
    loadTheme();
    renderNotes();
    setupEventListeners();
}

/**
 * Persistence Functions
 */
function loadNotes() {
    const storedNotes = localStorage.getItem('notes-app-data');
    if (storedNotes) {
        try {
            notes = JSON.parse(storedNotes);
        } catch (e) {
            console.error('Failed to parse notes', e);
            notes = [];
        }
    }
}

function saveNotes() {
    localStorage.setItem('notes-app-data', JSON.stringify(notes));
    renderNotes();
}

/**
 * Theme & Preferences
 */
function loadTheme() {
    const theme = localStorage.getItem('note-app-theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (moonIcon && sunIcon) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('note-app-theme', isDark ? 'dark' : 'light');

    if (isDark) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

/**
 * Note Operations
 */
function createNote(title, content, category) {
    const newNote = {
        id: Date.now(),
        title,
        content,
        category: category || 'personal',
        color: currentNoteState.color,
        isPinned: currentNoteState.isPinned,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    notes.unshift(newNote);
    saveNotes();
    showToast('Note created!');
}

function updateNote(id, title, content, category) {
    const index = notes.findIndex(n => n.id == id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            content,
            category: category || notes[index].category,
            color: currentNoteState.color,
            isPinned: currentNoteState.isPinned,
            updatedAt: new Date().toISOString()
        };
        saveNotes();
        showToast('Changes saved');
    }
}

function deleteNote(id) {
    notes = notes.filter(n => n.id != id);
    saveNotes();
    showToast('Note deleted', 'danger');
}

/**
 * UI Functions
 */
function renderNotes(query = '') {
    notesList.innerHTML = '';

    // 1. Filter by Category / Page
    let filteredNotes = notes;

    if (currentFilter === 'pinned') {
        filteredNotes = notes.filter(n => n.isPinned);
        pageTitle.textContent = 'Favorites';
    } else if (currentFilter !== 'all') {
        filteredNotes = notes.filter(n => n.category === currentFilter);
        pageTitle.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    } else {
        pageTitle.textContent = 'All Notes';
    }

    // 2. Filter by Search Query
    if (query) {
        const lowerQ = query.toLowerCase();
        filteredNotes = filteredNotes.filter(n =>
            n.title.toLowerCase().includes(lowerQ) ||
            n.content.toLowerCase().includes(lowerQ)
        );
    }

    // Update Count
    noteCountBadge.textContent = filteredNotes.length;

    // 3. Sort (Pinned first, then Date)
    filteredNotes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    if (filteredNotes.length === 0) {
        notesList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);">
                <p>No notes found here.</p>
            </div>
        `;
        return;
    }

    filteredNotes.forEach(note => {
        const card = document.createElement('div');
        card.className = `note-card color-${note.color || 'default'}`;
        card.setAttribute('data-id', note.id);

        const dateStr = new Date(note.updatedAt).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric'
        });

        // Pinned Badge
        if (note.isPinned) {
            const pinBadge = document.createElement('div');
            pinBadge.className = 'pinned-badge';
            pinBadge.innerHTML = '📌 Pinned';
            card.appendChild(pinBadge);
        }

        const h3 = document.createElement('h3');
        h3.className = 'note-title';
        h3.textContent = note.title;

        const p = document.createElement('div');
        p.className = 'note-preview';
        p.textContent = note.content;

        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.justifyContent = 'space-between';
        footer.style.alignItems = 'center';
        footer.style.marginTop = 'auto';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'note-date';
        dateDiv.textContent = dateStr;

        const catBadge = document.createElement('span');
        catBadge.textContent = note.category || 'personal';
        catBadge.style.fontSize = '0.7rem';
        catBadge.style.opacity = '0.6';
        catBadge.style.textTransform = 'capitalize';

        footer.appendChild(dateDiv);
        footer.appendChild(catBadge);

        // Hover Actions
        const actionsOverlay = document.createElement('div');
        actionsOverlay.className = 'card-actions';

        actionsOverlay.innerHTML = `
            <button class="action-btn edit" title="Edit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="action-btn delete" title="Delete">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
        `;

        actionsOverlay.querySelector('.edit').addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(note);
        });

        actionsOverlay.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Permanently delete this note?')) {
                deleteNote(note.id);
            }
        });

        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(footer);
        card.appendChild(actionsOverlay);

        card.addEventListener('click', () => openModal(note));

        notesList.appendChild(card);
    });
}

function openModal(note = null) {
    currentNoteState = {
        isPinned: note ? !!note.isPinned : false,
        color: note ? (note.color || 'default') : 'default',
        isPreviewMode: false
    };

    if (note) {
        // Edit Mode
        noteIdInput.value = note.id;
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        noteCategoryInput.value = note.category || 'personal';
        deleteBtn.classList.remove('hidden');

        const dateStr = new Date(note.updatedAt).toLocaleString();
        lastEditedSpan.textContent = `Edited ${dateStr}`;
    } else {
        // Create Mode
        noteForm.reset();
        noteIdInput.value = '';
        noteCategoryInput.value = currentFilter !== 'all' && currentFilter !== 'pinned' ? currentFilter : 'personal';
        deleteBtn.classList.add('hidden');
        lastEditedSpan.textContent = '';
    }

    updateModalUI();
    modal.classList.remove('hidden');
    modal.classList.add('active'); // for animation

    if (!note) {
        setTimeout(() => noteTitleInput.focus(), 100);
    }
}

function updateModalUI() {
    // Pin Button
    if (currentNoteState.isPinned) {
        pinNoteBtn.classList.add('active');
    } else {
        pinNoteBtn.classList.remove('active');
    }

    // Color Selection
    colorOptions.forEach(opt => {
        if (opt.dataset.color === currentNoteState.color) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });

    // Preview Mode
    if (currentNoteState.isPreviewMode) {
        noteContentInput.classList.add('hidden');
        notePreview.classList.remove('hidden');
        notePreview.innerHTML = parseMarkdown(noteContentInput.value);
    } else {
        noteContentInput.classList.remove('hidden');
        notePreview.classList.add('hidden');
    }
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Markdown
function parseMarkdown(text) {
    if (!text) return '';
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    html = html.replace(/\n/gim, '<br>');
    return html;
}

function exportNotes() {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'noted_backup.json');
    linkElement.click();
}

/**
 * Toast Notifications
 */
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : '🗑️'}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Event Listeners
 */
function setupEventListeners() {
    addNoteBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            currentFilter = item.dataset.filter;
            renderNotes(searchInput.value);
        });
    });

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = noteIdInput.value;
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();
        const category = noteCategoryInput.value;

        if (!title && !content) return;

        if (id) {
            updateNote(id, title, content, category);
        } else {
            createNote(title, content, category);
        }
        closeModal();
    });

    deleteBtn.addEventListener('click', () => {
        const id = noteIdInput.value;
        if (id && confirm('Delete this note?')) {
            deleteNote(id);
            closeModal();
        }
    });

    searchInput.addEventListener('input', (e) => {
        renderNotes(e.target.value);
    });

    themeToggle.addEventListener('click', toggleTheme);
    exportBtn.addEventListener('click', exportNotes);

    pinNoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentNoteState.isPinned = !currentNoteState.isPinned;
        updateModalUI();
    });

    previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentNoteState.isPreviewMode = !currentNoteState.isPreviewMode;
        updateModalUI();
    });

    colorOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            currentNoteState.color = opt.dataset.color;
            updateModalUI();
        });
    });
}

// Run App
init();
