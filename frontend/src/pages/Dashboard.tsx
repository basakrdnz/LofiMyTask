import { useState, useEffect } from 'react';
import { notesApi, Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import LoadingScreen from '../components/LoadingScreen';

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
    return <LoadingScreen />;
  }

  return (
    <div 
      className="min-h-screen p-6 transition-colors"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Sade */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-semibold mb-2" 
            style={{ 
              color: colors.text
            }}
          >
            Dashboard
          </h1>
          <p 
            className="text-sm" 
            style={{ 
              color: colors.text, 
              opacity: 0.6
            }}
          >
            Notlarınız ve görevleriniz
          </p>
        </div>

        {/* Tabs - Minimal */}
        <div className="flex space-x-1 mb-6 border-b" style={{ borderColor: colors.border }}>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${
              activeTab === 'notes' ? '' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              color: activeTab === 'notes' ? colors.primary : colors.text,
            }}
          >
            Notlar ({notes.length})
            {activeTab === 'notes' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${
              activeTab === 'tasks' ? '' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              color: activeTab === 'tasks' ? colors.primary : colors.text,
            }}
          >
            Görevler ({tasks.length})
            {activeTab === 'tasks' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </button>
        </div>

        {/* Error - Sade */}
        {error && (
          <div 
            className="px-4 py-3 rounded-lg mb-4 text-sm"
            style={{
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              border: '1px solid #FECACA'
            }}
          >
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                  Notlarım
                </h2>
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setShowNoteForm(true);
                    setShowTaskForm(false);
                  }}
                  className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 shadow-sm"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  + Yeni Not
                </button>
              </div>

              {notes.length === 0 ? (
                <div 
                  className="text-center py-16 rounded-xl border"
                  style={{ 
                    backgroundColor: colors.card, 
                    borderColor: colors.border 
                  }}
                >
                  <div className="text-4xl mb-3 opacity-40">📄</div>
                  <p className="text-base font-medium mb-1" style={{ color: colors.text }}>
                    Henüz notunuz yok
                  </p>
                  <p className="text-sm" style={{ color: colors.text, opacity: 0.6 }}>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                  Görevlerim
                </h2>
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setShowTaskForm(true);
                    setShowNoteForm(false);
                  }}
                  className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 shadow-sm"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  + Yeni Görev
                </button>
              </div>

              {tasks.length === 0 ? (
                <div 
                  className="text-center py-16 rounded-xl border"
                  style={{ 
                    backgroundColor: colors.card, 
                    borderColor: colors.border 
                  }}
                >
                  <div className="text-4xl mb-3 opacity-40">✅</div>
                  <p className="text-base font-medium mb-1" style={{ color: colors.text }}>
                    Henüz göreviniz yok
                  </p>
                  <p className="text-sm" style={{ color: colors.text, opacity: 0.6 }}>
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

