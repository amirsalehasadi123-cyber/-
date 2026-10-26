import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Sun,
  Moon,
  Globe,
  Share2,
  Copy,
  Check,
  User,
  LogOut,
  Sparkles,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsView: React.FC<{ onOpenLogin: () => void }> = ({ onOpenLogin }) => {
  const { lang, theme, student, t, setLang, setTheme, logout } = useApp();

  const [copied, setCopied] = useState(false);

  // App URL from environment or fallback
  const currentAppUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentAppUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>{t.nav.settings}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t.settings.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Feature A: Theme Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
      >
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span>{t.settings.themeTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.settings.themeDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Light Mode Option */}
          <button
            onClick={() => setTheme('light')}
            className={`p-5 rounded-2xl border text-start transition-all flex items-start gap-4 ${
              theme === 'light'
                ? 'bg-amber-50/70 border-amber-400 dark:border-amber-500 shadow-md ring-2 ring-amber-400/30'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              theme === 'light' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.lightMode}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {lang === 'fa' ? 'پس‌زمینه روشن، فونت تیره‌رنگ و کنتراست شفاف برای روز' : 'Bright background, clear dark typography for daytime.'}
              </p>
            </div>
          </button>

          {/* Dark Mode Option */}
          <button
            onClick={() => setTheme('dark')}
            className={`p-5 rounded-2xl border text-start transition-all flex items-start gap-4 ${
              theme === 'dark'
                ? 'bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              theme === 'dark' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.darkMode}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {lang === 'fa' ? 'پس‌زمینه سرمه‌ای تیره، کاهش خستگی چشم و صرفه‌جویی باتری' : 'Dark slate background, reduced eye strain & battery saving.'}
              </p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Feature B: Language Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
      >
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span>{t.settings.langTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.settings.langDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Persian Option */}
          <button
            onClick={() => setLang('fa')}
            className={`p-5 rounded-2xl border text-start transition-all flex items-center justify-between ${
              lang === 'fa'
                ? 'bg-indigo-50/70 dark:bg-indigo-950/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                فا
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.persianLang}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">راست‌چین (RTL)</p>
              </div>
            </div>
            {lang === 'fa' && <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          </button>

          {/* English Option */}
          <button
            onClick={() => setLang('en')}
            className={`p-5 rounded-2xl border text-start transition-all flex items-center justify-between ${
              lang === 'en'
                ? 'bg-indigo-50/70 dark:bg-indigo-950/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                EN
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.englishLang}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Left-to-Right (LTR)</p>
              </div>
            </div>
            {lang === 'en' && <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          </button>
        </div>
      </motion.div>

      {/* Student Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.settings.currentProfile}</p>
              {student ? (
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {student.fullName} ({t.login.gradeLabel}: {student.grade} - {t.login.classLabel}: {student.classSection})
                </p>
              ) : (
                <p className="text-sm font-bold text-slate-400 italic">
                  {lang === 'fa' ? 'دانش‌آموزی انتخاب نشده است' : 'No student profile selected'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              {t.settings.changeProfileBtn}
            </button>
            {student && (
              <button
                onClick={logout}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                title={t.login.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Requirement 14: Sharing & Deployment Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4"
      >
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-500" />
            <span>{t.settings.shareTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.settings.shareDesc}
          </p>
        </div>

        {/* Copy current website link */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{t.settings.appDevUrl}</p>
            <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 truncate max-w-md">
              {currentAppUrl}
            </p>
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.settings.linkCopied : t.settings.copyLink}</span>
          </button>
        </div>

        {/* Deployment Steps Guide */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>{t.settings.hostingTipsTitle}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">دستور Build</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t.settings.step1}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">سرویس‌های میزبانی</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t.settings.step2}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">سازگاری دستگاه‌ها</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t.settings.step3}</p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
