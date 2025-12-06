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
      className="rounded-xl shadow-sm p-5 hover:shadow-md transition-all border"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <div className="flex items-start mb-3">
        <h3 
          className="text-base font-semibold line-clamp-2 flex-1"
          style={{ color: colors.text }}
        >
          {note.title}
        </h3>
      </div>
      <p 
        className="text-sm mb-4 line-clamp-3"
        style={{ color: colors.text, opacity: 0.7 }}
      >
        {note.content}
      </p>
      <div className="flex justify-between items-center text-xs mb-3" style={{ color: colors.text, opacity: 0.5 }}>
        <span>{formatDate(note.updatedAt)}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{
            backgroundColor: colors.secondary,
            color: 'white'
          }}
        >
          Düzenle
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{
            backgroundColor: '#FEE2E2',
            color: '#DC2626'
          }}
        >
          Sil
        </button>
      </div>
    </div>
  );
}

