import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Settings2 } from 'lucide-react';

export default function StudyTimer() {
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  
  const [timeLeft, setTimeLeft] = useState(studyMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playNotification = (isFinishingStudy: boolean) => {
    // 1. Fallback / supplementary beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(isFinishingStudy ? 600 : 800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 1);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.error("Audio block:", e);
    }

    // 2. Text-to-Speech (Vietnamese)
    if ('speechSynthesis' in window) {
      const text = isFinishingStudy
        ? "Đã hết giờ học, đến lúc nghỉ ngơi rồi bạn nhé."
        : "Đã hết giờ nghỉ, quay lại học nào bạn ơi.";

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        // Cố gắng tìm giọng tiếng Việt nếu có trên hệ thống
        const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
        if (viVoice) {
          utterance.voice = viVoice;
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        setVoiceAndSpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceAndSpeak();
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playNotification(isStudyMode);
            const nextMode = !isStudyMode;
            setIsStudyMode(nextMode);
            return (nextMode ? studyMinutes : breakMinutes) * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isStudyMode, studyMinutes, breakMinutes]);

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setIsStudyMode(true);
    setTimeLeft(studyMinutes * 60);
  };
  
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft((isStudyMode ? studyMinutes : breakMinutes) * 60);
    }
  }, [studyMinutes, breakMinutes, isStudyMode]);

  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="bg-white border text-center border-neutral-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-neutral-400">Bấm giờ</h2>
        <button onClick={() => setShowSettings(!showSettings)} className={`text-neutral-400 hover:text-neutral-700 transition-transform ${showSettings ? 'rotate-90' : ''}`}>
          <Settings2 size={18} />
        </button>
      </div>
      
      {showSettings && (
         <div className="grid grid-cols-2 gap-3 mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
           <div className="flex flex-col items-center gap-1">
             <label className="text-[11px] uppercase tracking-wide font-semibold text-neutral-500">Học (phút)</label>
             <input type="number" min={1} value={studyMinutes} onChange={(e) => setStudyMinutes(Number(e.target.value) || 1)} className="w-16 px-2 py-1.5 text-sm text-center border font-medium rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all bg-white" />
           </div>
           <div className="flex flex-col items-center gap-1">
             <label className="text-[11px] uppercase tracking-wide font-semibold text-neutral-500">Nghỉ (phút)</label>
             <input type="number" min={1} value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value) || 1)} className="w-16 px-2 py-1.5 text-sm text-center border font-medium rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 outline-none transition-all bg-white" />
           </div>
         </div>
      )}

      <div className={`text-5xl font-sans font-bold tracking-tight mb-2 tabular-nums transition-colors duration-500 ${isStudyMode ? 'text-blue-600' : 'text-emerald-500'}`}>
        {m}:{s}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-8">
        {isStudyMode ? 'Gian học' : 'Nghỉ ngơi'}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={handleStartPause} className={`w-14 h-14 flex items-center justify-center rounded-full text-white transition-all hover:scale-105 active:scale-95 shadow-md ${isRunning ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' : 'bg-neutral-900 hover:bg-black shadow-neutral-900/30'}`}>
          {isRunning ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
        </button>
        <button onClick={handleReset} className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:scale-105 transition-all active:scale-95">
          <Square size={18} className="fill-current" />
        </button>
      </div>
    </div>
  );
}
