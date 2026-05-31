export interface Subject {
  id: string;
  name: string;
  colorClass: string;
}

export type Schedule = Record<string, string>; // key: "dayIndex_lessonIndex", value: subjectId

export interface MusicLink {
  id: string;
  title: string;
  url: string;
}

export const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: "python",
    name: "Python",
    colorClass: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  },
  {
    id: "iot",
    name: "IoT",
    colorClass: "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200",
  },
  {
    id: "latex_manim",
    name: "Latex - Manim",
    colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200",
  },
  {
    id: "english",
    name: "Tiếng Anh",
    colorClass: "bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200",
  },
  {
    id: "math_materials",
    name: "Soạn Tài liệu Toán",
    colorClass: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200",
  },
];

export const DAYS = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ Nhật",
];

// Số thứ tự tiết học
export const LESSONS = Array.from({ length: 12 }, (_, i) => i + 1);

export const LESSON_TIMES: Record<number, string> = {
  1: "07:00",
  2: "07:50",
  3: "08:45",
  4: "09:35",
  5: "10:25",
  6: "13:00",
  7: "13:50",
  8: "14:45",
  9: "15:35",
  10: "16:25",
  11: "18:00",
  12: "18:50",
};

export const COLOR_OPTIONS = [
  "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200",
  "bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200",
  "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200",
  "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200",
  "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200",
  "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 hover:bg-fuchsia-200",
  "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200",
  "bg-lime-100 text-lime-800 border-lime-300 hover:bg-lime-200",
  "bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200",
];
