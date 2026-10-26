import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t, setCurrentView } = useApp();

  return (
    <footer className="mt-auto bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & School Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {lang === 'fa' ? t.schoolName : t.schoolNameEn}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.portalSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button onClick={() => setCurrentView('home')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.home}
            </button>
            <button onClick={() => setCurrentView('schedule')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.schedule}
            </button>
            <button onClick={() => setCurrentView('assignments')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.assignments}
            </button>
            <button onClick={() => setCurrentView('grades')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.grades}
            </button>
            <button onClick={() => setCurrentView('announcements')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.announcements}
            </button>
            <button onClick={() => setCurrentView('settings')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.settings}
            </button>
          </div>

          {/* Security & Standard Badge */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'fa' ? 'سامانه رسمی آموزشی' : 'Official Portal'}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-200 dark:border-slate-800/80" />

        {/* Bottom Bar: Copyright & Mandatory Author Signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {lang === 'fa' ? t.schoolName : t.schoolNameEn}. {lang === 'fa' ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}
          </p>

          {/* MANDATORY AUTHOR SIGNATURE REQUIREMENT 12 */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span>{t.authorSignature}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
