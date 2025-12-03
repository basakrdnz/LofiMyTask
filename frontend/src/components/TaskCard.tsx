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
      className={`rounded-3xl shadow-lg p-5 transition-all transform hover:scale-[1.02] hover:-translate-y-1 border-4 animate-fadeInUp ${
        task.completed ? 'opacity-75' : ''
      }`}
      style={{
        backgroundColor: colors.card,
        borderColor: task.completed ? colors.secondary : colors.border,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px ${colors.border}60`
      }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-3 flex items-center justify-center transition-all ${
            task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </button>
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-xl">{task.completed ? '✅' : '📋'}</span>
            <h3 
              className={`text-lg font-bold flex-1 ${
                task.completed ? 'line-through' : ''
              }`}
              style={{ 
                color: task.completed ? colors.text + '80' : colors.text 
              }}
            >
              {task.title}
            </h3>
          </div>
          <p 
            className={`text-sm mb-3 ${
              task.completed ? 'line-through' : ''
            }`}
            style={{ 
              color: task.completed ? colors.text + '60' : colors.text,
              opacity: task.completed ? 0.6 : 0.8
            }}
          >
            {task.content}
          </p>
          {task.deadline && (
            <div className="mb-2">
              <span 
                className="text-xs font-medium px-2 py-1 rounded-xl"
                style={{
                  backgroundColor: task.completed ? colors.secondary + '40' : '#FEE2E2',
                  color: task.completed ? colors.text : '#DC2626'
                }}
              >
                ⏰ Deadline: {formatDate(task.deadline)}
                {!task.completed && new Date(task.deadline) < new Date() && (
                  <span className="ml-1">⚠️ Geçti!</span>
                )}
                {!task.completed && new Date(task.deadline) >= new Date() && 
                 new Date(task.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                  <span className="ml-1">🔔 Yaklaşıyor!</span>
                )}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: colors.text, opacity: 0.6 }}>
              {formatDate(task.updatedAt)}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="px-3 py-1.5 rounded-2xl text-xs font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.secondary,
                  color: 'white'
                }}
              >
                ✏️
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 bg-red-100 text-red-600 hover:bg-red-200"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

