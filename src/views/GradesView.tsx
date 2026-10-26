import React from 'react';
import { useApp } from '../context/AppContext';
import { ComingSoonCard } from '../components/ComingSoonCard';
import { Award } from 'lucide-react';

export const GradesView: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6 pb-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>{t.nav.grades}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t.nav.grades}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.home.gradesCardDesc}
        </p>
      </div>

      <ComingSoonCard
        title={t.nav.grades}
        description={t.status.gradesMsg}
        icon={<Award className="w-8 h-8" />}
      />
    </div>
  );
};
