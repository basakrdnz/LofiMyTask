import { Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';

interface TaskCardProps {
  task: Note;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
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
      className={`rounded-xl shadow-sm p-5 transition-all border ${
        task.completed ? 'opacity-60' : ''
      }`}
      style={{
        backgroundColor: colors.card,
        borderColor: task.completed ? colors.secondary : colors.border,
      }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all ${
            task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </button>
        <div className="flex-1">
            <h3 
            className={`text-base font-semibold mb-2 ${
                task.completed ? 'line-through' : ''
              }`}
              style={{ 
                color: task.completed ? colors.text + '80' : colors.text 
              }}
            >
              {task.title}
            </h3>
          <p 
            className={`text-sm mb-3 ${
              task.completed ? 'line-through' : ''
            }`}
            style={{ 
              color: task.completed ? colors.text + '60' : colors.text,
              opacity: task.completed ? 0.5 : 0.7
            }}
          >
            {task.content}
          </p>
          {task.deadline && (
            <div className="mb-3">
              <span 
                className="text-xs font-medium px-2 py-1 rounded"
                style={{
                  backgroundColor: task.completed ? colors.secondary + '30' : '#FEE2E2',
                  color: task.completed ? colors.text : '#DC2626'
                }}
              >
                Deadline: {formatDate(task.deadline)}
                {!task.completed && new Date(task.deadline) < new Date() && (
                  <span className="ml-1">⚠️</span>
                )}
                {!task.completed && new Date(task.deadline) >= new Date() && 
                 new Date(task.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                  <span className="ml-1">🔔</span>
                )}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: colors.text, opacity: 0.5 }}>
              {formatDate(task.updatedAt)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: colors.secondary,
                  color: 'white'
                }}
              >
                Düzenle
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626'
                }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

