import { useState, useEffect } from 'react';
import { notesApi, Note } from '../api/notes';
import { useThemeStore } from '../store/themeStore';
import LoadingScreen from '../components/LoadingScreen';

export default function Calendar() {
  const [tasks, setTasks] = useState<Note[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Note[]>([]);
  const { colors } = useThemeStore();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await notesApi.getAll('task');
      setTasks(data);
    } catch (err: any) {
      console.error('Görevler yüklenemedi:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Önceki ayın son günleri
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false
      });
    }
    
    // Bu ayın günleri
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }
    
    // Sonraki ayın ilk günleri (takvimi doldurmak için)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      if (task.completed) {
        // Tamamlanan görevler - tamamlandığı gün
        const completedDate = new Date(task.updatedAt).toISOString().split('T')[0];
        return completedDate === dateStr;
      } else if (task.deadline) {
        // Deadline olan görevler
        const deadlineDate = new Date(task.deadline).toISOString().split('T')[0];
        return deadlineDate === dateStr;
      }
      return false;
    });
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeInUp">
      <div className="mb-6">
        <h1 
          className="text-3xl font-semibold mb-2" 
          style={{ 
            color: colors.text
          }}
        >
          Takvim
        </h1>
        <p 
          className="text-sm" 
          style={{ 
            color: colors.text, 
            opacity: 0.6
          }}
        >
          Tamamlanan görevler için ⭐, deadline'lar için ⚠️
        </p>
      </div>

      {/* Ay Navigasyonu */}
      <div 
        className="flex justify-between items-center mb-6 p-4 rounded-xl"
        style={{ backgroundColor: colors.card }}
      >
        <button
          onClick={previousMonth}
          className="px-4 py-2 rounded-lg font-bold transition-all hover:scale-105"
          style={{
            backgroundColor: colors.secondary,
            color: 'white'
          }}
        >
          ← Önceki Ay
        </button>
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          {getMonthName(currentMonth)}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={goToToday}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            Bugün
          </button>
          <button
            onClick={nextMonth}
            className="px-4 py-2 rounded-lg font-bold transition-all hover:scale-105"
            style={{
              backgroundColor: colors.secondary,
              color: 'white'
            }}
          >
            Sonraki Ay →
          </button>
        </div>
      </div>

      {/* Takvim Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Hafta günleri başlıkları */}
        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
          <div
            key={day}
            className="text-center font-bold p-2 rounded-lg"
            style={{
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            {day}
          </div>
        ))}

        {/* Günler */}
        {days.map((day, index) => {
          const dayTasks = getTasksForDate(day.date);
          const isToday = day.date.getTime() === today.getTime();
          const completedTasks = dayTasks.filter(t => t.completed);
          const deadlineTasks = dayTasks.filter(t => !t.completed && t.deadline);
          const isPastDeadline = deadlineTasks.some(t => new Date(t.deadline!) < new Date());

          return (
            <div
              key={index}
              onClick={() => {
                if (dayTasks.length > 0) {
                  setSelectedDate(day.date);
                  setSelectedTasks(dayTasks);
                }
              }}
              className={`p-3 rounded-lg border-2 min-h-[100px] transition-all ${
                !day.isCurrentMonth ? 'opacity-40' : ''
              } ${isToday ? 'ring-4' : ''} ${dayTasks.length > 0 ? 'cursor-pointer hover:shadow-lg hover:scale-105' : ''}`}
              style={{
                backgroundColor: day.isCurrentMonth ? colors.card : colors.background,
                borderColor: isToday ? colors.primary : colors.border
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-sm font-bold ${
                    isToday ? 'text-lg' : ''
                  }`}
                  style={{
                    color: isToday ? colors.primary : colors.text
                  }}
                >
                  {day.date.getDate()}
                </span>
                <div className="flex flex-col items-end gap-1">
                  {completedTasks.length > 0 && (
                    <span className="text-lg" title={`${completedTasks.length} görev tamamlandı`}>
                      ⭐
                    </span>
                  )}
                  {deadlineTasks.length > 0 && (
                    <span
                      className={`text-lg ${
                        isPastDeadline ? 'animate-pulse' : ''
                      }`}
                      title={`${deadlineTasks.length} deadline var`}
                      style={{
                        filter: isPastDeadline ? 'drop-shadow(0 0 3px red)' : 'none'
                      }}
                    >
                      {isPastDeadline ? '⚠️' : '📌'}
                    </span>
                  )}
                </div>
              </div>
              {dayTasks.length > 0 && (
                <div className="text-xs space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className="truncate px-1 py-0.5 rounded"
                      style={{
                        backgroundColor: task.completed
                          ? colors.secondary + '40'
                          : '#FEE2E2',
                        color: task.completed ? colors.text : '#DC2626'
                      }}
                      title={task.title}
                    >
                      {task.completed ? '✓' : '⏰'} {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs" style={{ color: colors.text, opacity: 0.7 }}>
                      +{dayTasks.length - 2} daha
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Açıklama */}
      <div 
        className="mt-6 p-4 rounded-xl"
        style={{ backgroundColor: colors.card }}
      >
        <h3 className="font-bold mb-2" style={{ color: colors.text }}>
          📊 Gösterge
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⭐</span>
            <span style={{ color: colors.text }}>Tamamlanan görev (o gün)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">📌</span>
            <span style={{ color: colors.text }}>Deadline var (yaklaşıyor)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚠️</span>
            <span style={{ color: colors.text }}>Deadline geçti (acil!)</span>
          </div>
        </div>
      </div>

      {/* Görev Detayları Modal */}
      {selectedDate && selectedTasks.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setSelectedDate(null);
            setSelectedTasks([]);
          }}
        >
          <div 
            className="max-w-2xl w-full rounded-xl shadow-2xl border-2 max-h-[80vh] overflow-y-auto"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  📅 {selectedDate.toLocaleDateString('tr-TR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedTasks([]);
                  }}
                  className="text-2xl hover:scale-110 transition-all"
                  style={{ color: colors.text }}
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {selectedTasks.map((task) => {
                  const isCompleted = task.completed;
                  const hasDeadline = task.deadline;
                  const deadlineDate = hasDeadline ? new Date(task.deadline!) : null;
                  const isPastDeadline = hasDeadline && deadlineDate! < new Date();
                  const isUpcoming = hasDeadline && deadlineDate! >= new Date() && 
                                   deadlineDate! <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

                  return (
                    <div
                      key={task.id}
                      className="p-4 rounded-lg border-2"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: isCompleted ? colors.secondary : 
                                    isPastDeadline ? '#DC2626' : 
                                    isUpcoming ? '#F59E0B' : colors.border
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">
                          {isCompleted ? '✅' : hasDeadline ? (isPastDeadline ? '⚠️' : '📌') : '📋'}
                        </span>
                        <div className="flex-1">
                          <h3 
                            className={`text-lg font-bold mb-2 ${
                              isCompleted ? 'line-through' : ''
                            }`}
                            style={{ 
                              color: isCompleted ? colors.text + '80' : colors.text 
                            }}
                          >
                            {task.title}
                          </h3>
                          <p 
                            className={`text-sm mb-3 ${
                              isCompleted ? 'line-through' : ''
                            }`}
                            style={{ 
                              color: isCompleted ? colors.text + '60' : colors.text,
                              opacity: isCompleted ? 0.6 : 0.8
                            }}
                          >
                            {task.content}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {isCompleted && (
                              <span 
                                className="px-2 py-1 rounded"
                                style={{
                                  backgroundColor: colors.secondary + '40',
                                  color: colors.text
                                }}
                              >
                                ✅ Tamamlandı
                              </span>
                            )}
                            {hasDeadline && (
                              <span 
                                className="px-2 py-1 rounded font-medium"
                                style={{
                                  backgroundColor: isPastDeadline ? '#FEE2E2' : 
                                                  isUpcoming ? '#FEF3C7' : colors.secondary + '40',
                                  color: isPastDeadline ? '#DC2626' : 
                                         isUpcoming ? '#D97706' : colors.text
                                }}
                              >
                                ⏰ Deadline: {deadlineDate!.toLocaleDateString('tr-TR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                                {isPastDeadline && ' ⚠️ Geçti!'}
                                {isUpcoming && !isPastDeadline && ' 🔔 Yaklaşıyor!'}
                              </span>
                            )}
                            <span 
                              className="px-2 py-1 rounded"
                              style={{
                                backgroundColor: colors.secondary + '20',
                                color: colors.text,
                                opacity: 0.7
                              }}
                            >
                              📅 Oluşturulma: {new Date(task.createdAt).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

