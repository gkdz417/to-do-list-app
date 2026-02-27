// ── State ──────────────────────────────────────────────
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentFilter = 'all';

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setDateBadge();
  renderAll();

  document.getElementById('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });
});

// ── Date badge ─────────────────────────────────────────
function setDateBadge() {
  const now = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long' };
  document.getElementById('dateBadge').textContent =
    now.toLocaleDateString('tr-TR', opts);
}

// ── Save ───────────────────────────────────────────────
function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ── Add task ───────────────────────────────────────────
function addTask() {
  const input = document.getElementById('taskInput');
  const priority = document.getElementById('prioritySelect').value;
  const text = input.value.trim();
  if (!text) {
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    input.focus();
    return;
  }
  tasks.unshift({ id: Date.now(), text, priority, done: false });
  save();
  renderAll();
  input.value = '';
  input.focus();
}

// ── Toggle done ────────────────────────────────────────
function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; save(); renderAll(); }
}

// ── Delete task ────────────────────────────────────────
function deleteTask(id) {
  const el = document.getElementById('task-' + id);
  if (el) {
    el.style.animation = 'fadeOut 0.25s ease forwards';
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      save();
      renderAll();
    }, 240);
  }
}

// ── Clear completed ────────────────────────────────────
function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  save();
  renderAll();
}

// ── Filter ─────────────────────────────────────────────
function setFilter(f) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === f);
  });
  renderAll();
}

// ── Render ─────────────────────────────────────────────
function renderAll() {
  updateStats();
  renderTasks();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const active = total - done;
  const pct = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('totalCount').textContent = total;
  document.getElementById('activeCount').textContent = active;
  document.getElementById('doneCount').textContent = done;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = pct + '%';
}

function renderTasks() {
  const list = document.getElementById('taskList');
  const empty = document.getElementById('emptyState');

  const filtered = tasks.filter(t => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });

  // Remove all task items (not the empty state)
  Array.from(list.children).forEach(c => {
    if (c.id !== 'emptyState') c.remove();
  });

  if (filtered.length === 0) {
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  const priorityOrder = { high: 0, normal: 1, low: 2 };
  const sorted = [...filtered].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  sorted.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-item' + (t.done ? ' done' : '');
    li.id = 'task-' + t.id;
    li.dataset.priority = t.priority;

    const priorityLabel = { high: 'Yüksek', normal: 'Normal', low: 'Düşük' }[t.priority];

    li.innerHTML = `
      <div class="task-checkbox ${t.done ? 'checked' : ''}" 
           onclick="toggleTask(${t.id})" 
           role="checkbox" 
           aria-checked="${t.done}">
        ${t.done ? '✓' : ''}
      </div>
      <span class="task-text">${escapeHtml(t.text)}</span>
      <div class="task-meta">
        <span class="priority-badge ${t.priority}">${priorityLabel}</span>
        <button class="delete-btn" onclick="deleteTask(${t.id})" aria-label="Görevi sil">✕</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Extra animations via CSS ───────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)}
  }
  @keyframes fadeOut {
    to { opacity:0; transform:translateX(20px) scale(0.95); }
  }
  #taskInput.shake { animation: shake 0.3s ease; border-color: var(--danger) !important; }
`;
document.head.appendChild(style);
