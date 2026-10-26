import React from 'react';
import { useApp } from '../context/AppContext';
import { ComingSoonCard } from '../components/ComingSoonCard';
import { UserCheck } from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6 pb-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
          <UserCheck className="w-3.5 h-3.5" />
          <span>{t.nav.attendance}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t.nav.attendance}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.home.attendanceCardDesc}
        </p>
      </div>

      <ComingSoonCard
        title={t.nav.attendance}
        description={t.status.attendanceMsg}
        icon={<UserCheck className="w-8 h-8" />}
      />
    </div>
  );
};
