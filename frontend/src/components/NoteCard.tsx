import { Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const { colors } = useThemeStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="rounded-3xl shadow-lg p-5 hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 border-4 animate-fadeInUp"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px ${colors.border}60`
      }}
    >
      <div className="flex items-start mb-3">
        <span className="text-2xl mr-2">📄</span>
        <h3 
          className="text-lg font-bold line-clamp-2 flex-1"
          style={{ color: colors.text }}
        >
          {note.title}
        </h3>
      </div>
      <p 
        className="text-sm mb-4 line-clamp-3"
        style={{ color: colors.text, opacity: 0.8 }}
      >
        {note.content}
      </p>
      <div className="flex justify-between items-center text-xs mb-3" style={{ color: colors.text, opacity: 0.6 }}>
        <span>{formatDate(note.updatedAt)}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-2 rounded-2xl text-sm font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: colors.secondary,
            color: 'white'
          }}
        >
          ✏️ Düzenle
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 bg-red-100 text-red-600 hover:bg-red-200"
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  );
}

