import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ title, description, icon }) => {
  const { lang, t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm transition-colors my-6"
    >
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-2xl rotate-6" />
        <div className="relative w-full h-full bg-gradient-to-tr from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
          {icon}
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-bold mb-4">
        <Clock className="w-3.5 h-3.5" />
        <span>{t.status.comingSoon}</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
        {description}
      </p>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 max-w-lg mx-auto">
        <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
        <span>
          {lang === 'fa'
            ? 'اطلاعات پس از ثبت رسمی توسط معلمان و کادر مدرسه در این قسمت قرار می‌گیرد.'
            : 'Information will be displayed here once officially updated by school faculty.'}
        </span>
      </div>
    </motion.div>
  );
};
