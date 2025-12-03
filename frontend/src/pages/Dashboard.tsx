import { useState, useEffect } from 'react';
import { notesApi, Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes');
  const { colors } = useThemeStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [notesData, tasksData] = await Promise.all([
        notesApi.getAll('note'),
        notesApi.getAll('task')
      ]);
      setNotes(notesData);
      setTasks(tasksData);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Veriler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (title: string, content: string, type: 'note' | 'task', deadline?: string | null) => {
    try {
      await notesApi.create({ title, content, type, deadline });
      await loadData();
      setShowNoteForm(false);
      setShowTaskForm(false);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Oluşturulamadı');
    }
  };

  const handleUpdate = async (id: string, title: string, content: string, deadline?: string | null) => {
    try {
      await notesApi.update(id, { title, content, deadline });
      await loadData();
      setEditingNote(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Güncellenemedi');
    }
  };

  const handleToggleTask = async (task: Note) => {
    try {
      await notesApi.update(task.id, { completed: !task.completed });
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Güncellenemedi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await notesApi.delete(id);
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Silinemedi');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl">📚</div>
        <div className="ml-4 text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-6 transition-colors"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto animate-fadeInUp">
        {/* Header */}
        <div className="mb-6">
          <h1 
            className="text-5xl font-black mb-2 animate-slideInDown" 
            style={{ 
              color: colors.text,
              fontFamily: "'Poppins', sans-serif",
              textShadow: `0 2px 10px ${colors.primary}20`
            }}
          >
            📖 MyTask
          </h1>
          <p 
            className="text-sm animate-slideInUp" 
            style={{ 
              color: colors.text, 
              opacity: 0.7,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Notlarınız ve görevleriniz burada
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-6 py-3 rounded-t-2xl font-semibold transition-all transform ${
              activeTab === 'notes'
                ? 'shadow-lg scale-105 animate-pulse-slow'
                : 'opacity-70 hover:opacity-100 hover:scale-102'
            }`}
            style={{
              backgroundColor: activeTab === 'notes' ? colors.card : colors.background,
              color: colors.text,
              borderBottom: activeTab === 'notes' ? `3px solid ${colors.primary}` : 'none'
            }}
          >
            📝 Notlar ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 rounded-t-2xl font-semibold transition-all transform ${
              activeTab === 'tasks'
                ? 'shadow-lg scale-105 animate-pulse-slow'
                : 'opacity-70 hover:opacity-100 hover:scale-102'
            }`}
            style={{
              backgroundColor: activeTab === 'tasks' ? colors.card : colors.background,
              color: colors.text,
              borderBottom: activeTab === 'tasks' ? `3px solid ${colors.primary}` : 'none'
            }}
          >
            ✅ Görevler ({tasks.length})
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Forms */}
        {showNoteForm && (
          <div className="mb-6">
            <NoteForm
              onSubmit={(title, content) => handleCreate(title, content, 'note')}
              onCancel={() => setShowNoteForm(false)}
            />
          </div>
        )}

        {showTaskForm && (
          <div className="mb-6">
            <TaskForm
              task={editingNote?.type === 'task' ? editingNote : undefined}
              onSubmit={(title, content, deadline) => {
                if (editingNote) {
                  handleUpdate(editingNote.id, title, content, deadline);
                } else {
                  handleCreate(title, content, 'task', deadline);
                }
              }}
              onCancel={() => {
                setShowTaskForm(false);
                setEditingNote(null);
              }}
            />
          </div>
        )}

        {editingNote && editingNote.type === 'note' && (
          <div className="mb-6">
            <NoteForm
              note={editingNote}
              onSubmit={(title, content) => handleUpdate(editingNote.id, title, content)}
              onCancel={() => setEditingNote(null)}
            />
          </div>
        )}

        {editingNote && editingNote.type === 'task' && !showTaskForm && (
          <div className="mb-6">
            <TaskForm
              task={editingNote}
              onSubmit={(title, content, deadline) => handleUpdate(editingNote.id, title, content, deadline)}
              onCancel={() => setEditingNote(null)}
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'notes' ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  📝 Notlarım
                </h2>
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setShowNoteForm(true);
                    setShowTaskForm(false);
                  }}
                  className="px-4 py-2 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95 animate-bounce-slow"
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  ✨ + Yeni Not
                </button>
              </div>

              {notes.length === 0 ? (
                <div className="text-center py-12 rounded-3xl border-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-lg font-medium" style={{ color: colors.text }}>
                    Henüz notunuz yok
                  </p>
                  <p className="text-sm mt-2" style={{ color: colors.text, opacity: 0.7 }}>
                    İlk notunuzu oluşturmak için yukarıdaki butona tıklayın
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={() => {
                        setEditingNote(note);
                        setShowNoteForm(false);
                        setShowTaskForm(false);
                      }}
                      onDelete={() => handleDelete(note.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  ✅ Görevlerim
                </h2>
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setShowTaskForm(true);
                    setShowNoteForm(false);
                  }}
                  className="px-4 py-2 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-110 active:scale-95 animate-bounce-slow"
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  ✨ + Yeni Görev
                </button>
              </div>

              {tasks.length === 0 ? (
                <div className="text-center py-12 rounded-3xl border-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-lg font-medium" style={{ color: colors.text }}>
                    Henüz göreviniz yok
                  </p>
                  <p className="text-sm mt-2" style={{ color: colors.text, opacity: 0.7 }}>
                    İlk görevinizi oluşturmak için yukarıdaki butona tıklayın
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => handleToggleTask(task)}
                      onEdit={() => {
                        setEditingNote(task);
                        setShowNoteForm(false);
                        setShowTaskForm(false);
                      }}
                      onDelete={() => handleDelete(task.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

