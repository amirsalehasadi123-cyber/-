import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Grade, ClassSection } from '../types';
import { Calendar, Filter, Clock, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ScheduleView: React.FC = () => {
  const { lang, student, t } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<Grade>(student?.grade || '7');
  const [selectedClass, setSelectedClass] = useState<ClassSection>(student?.classSection || 'A');

  const daysFa = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
  const daysEn = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
  const days = lang === 'fa' ? daysFa : daysEn;

  const periodsFa = ['زنگ اول (۸:۰۰ - ۹:۳۰)', 'زنگ دوم (۹:۴۵ - ۱۱:۱۵)', 'زنگ سوم (۱۱:۳۰ - ۱۳:۰۰)'];
  const periodsEn = ['Period 1 (8:00 - 9:30)', 'Period 2 (9:45 - 11:15)', 'Period 3 (11:30 - 13:00)'];
  const periods = lang === 'fa' ? periodsFa : periodsEn;

  return (
    <div className="space-y-6 pb-8">
      
      {/* Page Title */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav.schedule}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.schedule.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.schedule.subtitle}
          </p>
        </div>

        {/* Grade & Class Filter bar */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Filter className="w-4 h-4 text-indigo-500" />
            <span>{t.schedule.filterGrade}</span>
          </div>

          {/* Grade Selector */}
          <div className="flex items-center gap-1">
            {(['7', '8', '9'] as Grade[]).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGrade === g
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                {lang === 'fa' ? `پایه ${g}` : `Grade ${g}`}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600 hidden xs:block" />

          {/* Class Selector */}
          <div className="flex items-center gap-1">
            {(['A', 'B', 'C'] as ClassSection[]).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedClass === c
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                {lang === 'fa' ? `کلاس ${c}` : `Class ${c}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Class Banner */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold">
            {lang === 'fa'
              ? `برنامه درسی پایه ${selectedGrade} - کلاس ${selectedClass}`
              : `Timetable for Grade ${selectedGrade} - Class ${selectedClass}`}
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
          {t.status.comingSoon}
        </span>
      </div>

      {/* Timetable Matrix showing "به‌زودی" coming soon notice without fake schedule data */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-10 text-center">
        
        <div className="max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800 shadow-sm">
            <Clock className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.status.comingSoon}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.status.scheduleMsg}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2 text-start">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              {lang === 'fa'
                ? 'طبق ضوابط مدیریت مدرسه، از ارائه برنامه هفتگی غیرواقعی خودداری شده است. پس از تایید نهایی معاونت فناوری آموزشی، برنامه رسمی کلاسی در این جدول قرار خواهد گرفت.'
                : 'In accordance with school policy, no simulated timetable is shown. Official schedules will be posted here once verified by the academic administration.'}
            </span>
          </div>
        </div>

        {/* Timetable Outline Structure */}
        <div className="mt-8 overflow-x-auto opacity-60">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">{t.schedule.timeSlot}</th>
                {days.map((day, idx) => (
                  <th key={idx} className="p-3 border border-slate-200 dark:border-slate-700 font-bold">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, pIdx) => (
                <tr key={pIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400">
                    {period}
                  </td>
                  {days.map((_, dIdx) => (
                    <td key={dIdx} className="p-3 border border-slate-200 dark:border-slate-700 text-slate-400 italic">
                      {t.status.comingSoon}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
