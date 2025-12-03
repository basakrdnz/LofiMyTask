import { useState, useEffect } from 'react';
import { notesApi, Note } from '../api/notes';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await notesApi.getAll();
      setNotes(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Notlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (title: string, content: string) => {
    try {
      await notesApi.create({ title, content });
      await loadNotes();
      setShowForm(false);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Not oluşturulamadı');
    }
  };

  const handleUpdate = async (id: string, title: string, content: string) => {
    try {
      await notesApi.update(id, { title, content });
      await loadNotes();
      setEditingNote(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Not güncellenemedi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu notu silmek istediğinize emin misiniz?')) {
      return;
    }
    try {
      await notesApi.delete(id);
      await loadNotes();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Not silinemedi');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Notlarım</h1>
        <button
          onClick={() => {
            setEditingNote(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          + Yeni Not
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6">
          <NoteForm
            onSubmit={(title, content) => {
              handleCreate(title, content);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingNote && (
        <div className="mb-6">
          <NoteForm
            note={editingNote}
            onSubmit={(title, content) => {
              handleUpdate(editingNote.id, title, content);
            }}
            onCancel={() => setEditingNote(null)}
          />
        </div>
      )}

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Henüz notunuz yok.</p>
          <p className="text-gray-400 mt-2">Yeni bir not oluşturmak için yukarıdaki butona tıklayın.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => {
                setEditingNote(note);
                setShowForm(false);
              }}
              onDelete={() => handleDelete(note.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

