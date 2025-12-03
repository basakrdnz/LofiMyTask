import { useState, useEffect } from 'react';
import { Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';

interface TaskFormProps {
  task?: Note;
  onSubmit: (title: string, content: string, deadline: string | null) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const { colors } = useThemeStore();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setContent(task.content);
      setDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim(), deadline ? new Date(deadline).toISOString() : null);
      if (!task) {
        setTitle('');
        setContent('');
        setDeadline('');
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
          📋 Görev Başlığı
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
            color: colors.text
          }}
          placeholder="Görev başlığı..."
        />
      </div>
      <div className="mb-4">
        <label 
          htmlFor="content" 
          className="block text-sm font-bold mb-2"
          style={{ color: colors.text }}
        >
          📄 Açıklama
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all resize-none"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.text
          }}
          placeholder="Görev açıklaması..."
        />
      </div>
      <div className="mb-4">
        <label 
          htmlFor="deadline" 
          className="block text-sm font-bold mb-2"
          style={{ color: colors.text }}
        >
          ⏰ Deadline (İsteğe bağlı)
        </label>
        <input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border-3 focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.text
          }}
        />
        {deadline && (
          <p className="text-xs mt-1" style={{ color: colors.text, opacity: 0.7 }}>
            Haftalık hatırlatma aktif olacak
          </p>
        )}
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
          {task ? '💾 Güncelle' : '✨ Oluştur'}
        </button>
      </div>
    </form>
  );
}

