import { useState, useEffect } from 'react';
import { Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';

interface NoteFormProps {
  note?: Note;
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

export default function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { colors } = useThemeStore();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      if (!note) {
        setTitle('');
        setContent('');
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="rounded-3xl shadow-xl p-6 border-4 animate-fadeInUp"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border
      }}
    >
      <div className="mb-4">
        <label 
          htmlFor="title" 
          className="block text-sm font-bold mb-2"
          style={{ color: colors.text }}
        >
          📝 Başlık
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl border-3 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.text,
            focusRingColor: colors.primary
          }}
          placeholder="Başlık yazın..."
        />
      </div>
      <div className="mb-4">
        <label 
          htmlFor="content" 
          className="block text-sm font-bold mb-2"
          style={{ color: colors.text }}
        >
          📄 İçerik
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all resize-none"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.text
          }}
          placeholder="İçerik yazın..."
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-2xl font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: colors.secondary + '40',
            color: colors.text
          }}
        >
          ❌ İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-bold transition-all hover:scale-105 shadow-md"
          style={{
            backgroundColor: colors.primary,
            color: 'white'
          }}
        >
          {note ? '💾 Güncelle' : '✨ Oluştur'}
        </button>
      </div>
    </form>
  );
}

