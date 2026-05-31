import React, { useState, useEffect } from "react";
import { GripVertical, X, Plus, Trash2 } from "lucide-react";
import { DEFAULT_SUBJECTS, DAYS, LESSONS, Schedule, Subject, COLOR_OPTIONS } from "./types";
import StudyTimer from "./components/StudyTimer";
import MusicLinks from "./components/MusicLinks";

export default function App() {
  const [schedule, setSchedule] = useState<Schedule>(() => {
    const saved = localStorage.getItem("timetable_schedule");
    return saved ? JSON.parse(saved) : {};
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("timetable_subjects");
    return saved ? JSON.parse(saved) : DEFAULT_SUBJECTS;
  });

  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem("timetable_notes") || "";
  });

  const [newSubjectName, setNewSubjectName] = useState("");

  useEffect(() => {
    localStorage.setItem("timetable_schedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem("timetable_subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("timetable_notes", notes);
  }, [notes]);

  const handleDragStart = (
    e: React.DragEvent,
    subjectId: string,
    sourceKey?: string
  ) => {
    e.dataTransfer.setData("subjectId", subjectId);
    if (sourceKey) {
      e.dataTransfer.setData("sourceKey", sourceKey);
    }
  };

  const handleDrop = (e: React.DragEvent, dayIndex: number, lessonIndex: number) => {
    e.preventDefault();
    const subjectId = e.dataTransfer.getData("subjectId");
    const sourceKey = e.dataTransfer.getData("sourceKey");

    if (!subjectId) return;

    const targetKey = `${dayIndex}_${lessonIndex}`;

    setSchedule((prev) => {
      const newSchedule = { ...prev };
      if (sourceKey && sourceKey !== targetKey) {
        delete newSchedule[sourceKey];
      }
      newSchedule[targetKey] = subjectId;
      return newSchedule;
    });
  };

  const handleRemoveFromSchedule = (key: string) => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      delete newSchedule[key];
      return newSchedule;
    });
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const colorClass = COLOR_OPTIONS[subjects.length % COLOR_OPTIONS.length];
    const newSubject: Subject = {
      id: `sub_${Date.now()}`,
      name: newSubjectName.trim(),
      colorClass,
    };
    setSubjects([...subjects, newSubject]);
    setNewSubjectName("");
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects(subjects.filter((s) => s.id !== subjectId));
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      Object.keys(newSchedule).forEach((key) => {
        if (newSchedule[key] === subjectId) {
          delete newSchedule[key];
        }
      });
      return newSchedule;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col xl:flex-row text-neutral-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full xl:w-72 2xl:w-80 bg-white border-b xl:border-b-0 xl:border-r border-neutral-200 p-6 flex flex-col flex-shrink-0 relative z-10 shadow-sm h-auto xl:h-screen overflow-y-auto">
        <h1 className="text-xl font-bold tracking-tight mb-2 text-neutral-900">
          Thời Khóa Biểu
        </h1>
        <p className="text-xs text-neutral-500 mb-6 leading-relaxed shrink-0">
          Kéo thả môn học vào các tiết. Quản lý môn học và ghi chú tại đây.
        </p>

        {/* Notes Section */}
        <div className="mb-6 flex flex-col shrink-0">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-neutral-400 mb-3">
            Ghi chú
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Nhập ghi chú của bạn..."
            className="w-full min-h-[140px] bg-yellow-50/50 border border-yellow-200 rounded-xl p-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 resize-none transition-all placeholder:text-yellow-600/40"
          ></textarea>
        </div>

        {/* Subjects List */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-neutral-400 mb-3 shrink-0">
            Môn học
          </h2>
          
          <form onSubmit={handleAddSubject} className="flex gap-2 mb-4 shrink-0">
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Thêm môn học mới..."
              className="flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!newSubjectName.trim()}
              className="flex-shrink-0 bg-neutral-900 text-white p-2 rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={18} />
            </button>
          </form>

          <div className="flex-1 overflow-y-auto pr-1 pb-4 flex flex-col gap-2">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                draggable
                onDragStart={(e) => handleDragStart(e, subject.id)}
                className={`group flex items-center justify-between cursor-grab active:cursor-grabbing p-3 rounded-xl border opacity-90 hover:opacity-100 transition-all ${subject.colorClass}`}
              >
                <div className="flex items-center min-w-0">
                  <GripVertical size={16} className="mr-2 opacity-50 flex-shrink-0" />
                  <span className="font-medium text-sm truncate pr-2">{subject.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-black/10 transition-opacity flex-shrink-0 text-current"
                  title="Xóa môn học"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {subjects.length === 0 && (
              <p className="text-sm text-neutral-400 text-center py-4 border border-dashed rounded-xl">
                Chưa có môn học nào.
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Grid area */}
      <main className="flex-1 h-auto xl:h-screen overflow-auto bg-neutral-50 p-4 md:p-6">
        <div className="min-w-[700px] max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-neutral-200 bg-neutral-50/50">
            <div className="p-4 border-r border-neutral-200 text-center font-medium text-neutral-400 text-xs">
              Tiết
            </div>
            {DAYS.map((day) => (
              <div
                key={day}
                className="p-4 border-r last:border-r-0 border-neutral-200 text-center font-semibold text-neutral-700 text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="divide-y divide-neutral-200">
            {LESSONS.map((lessonIndex) => (
              <div key={lessonIndex} className="grid grid-cols-[80px_repeat(7,1fr)]">
                <div className="flex items-center justify-center p-2 border-r border-neutral-200 text-xs font-medium text-neutral-500 bg-neutral-50/30">
                  Tiết {lessonIndex}
                </div>

                {DAYS.map((_, dayIndex) => {
                  const cellKey = `${dayIndex}_${lessonIndex}`;
                  const subjectId = schedule[cellKey];
                  const subject = subjects.find((s) => s.id === subjectId);

                  return (
                    <div
                      key={cellKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, dayIndex, lessonIndex)}
                      className="min-h-[64px] border-r border-neutral-100 last:border-r-0 p-1.5 transition-colors hover:bg-neutral-50"
                    >
                      {subject ? (
                        <div
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, subject.id, cellKey)
                          }
                          className={`group relative h-full flex items-center justify-center rounded-lg border text-sm font-medium cursor-grab active:cursor-grabbing p-2 overflow-hidden ${subject.colorClass}`}
                        >
                          <span className="truncate w-full text-center leading-tight">{subject.name}</span>
                          <button
                            onClick={() => handleRemoveFromSchedule(cellKey)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-black/10 transition-opacity"
                            aria-label="Xóa"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-lg border-2 border-dashed border-transparent hover:border-neutral-200 transition-colors" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full xl:w-80 2xl:w-[360px] bg-neutral-50 border-t xl:border-t-0 xl:border-l border-neutral-200 p-6 flex flex-col gap-6 flex-shrink-0 sm:flex-row xl:flex-col h-auto xl:h-screen overflow-y-auto">
        <div className="w-full sm:w-1/2 xl:w-full">
          <StudyTimer />
        </div>
        <div className="flex-1 min-h-[300px] sm:min-h-0 w-full sm:w-1/2 xl:w-full">
          <MusicLinks />
        </div>
      </aside>
    </div>
  );
}
