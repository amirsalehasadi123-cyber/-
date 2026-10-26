import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AnnouncementItem } from '../types';
import { Bell, Calendar, Tag, Info, Sparkles, Pin } from 'lucide-react';
import { motion } from 'motion/react';

export const AnnouncementsView: React.FC = () => {
  const { lang, t } = useApp();

  // State to test dynamic announcements vs empty state
  const [showDemoAnnouncements, setShowDemoAnnouncements] = useState<boolean>(false);

  const officialAnnouncements: AnnouncementItem[] = [
    {
      id: 'ann-1',
      titleFa: 'آغاز رسمی سال تحصیلی جدید و آماده‌سازی پورتال دانش‌آموزی',
      titleEn: 'Official Start of New Academic Term & Student Portal Activation',
      dateFa: '۱ آبان ۱۴۰۳',
      dateEn: 'October 22, 2024',
      categoryFa: 'آموزشی',
      categoryEn: 'Academic',
      summaryFa: 'به اطلاع کلیه دانش‌آموزان پایه‌های هفتم، هشتم و نهم می‌رساند پورتال اطلاع‌رسانی مدرسه شهید صیاد شیرازی به صورت رسمی راه‌اندازی گردید.',
      summaryEn: 'We hereby inform all 7th, 8th, and 9th grade students that the official portal of Shahid Sayyad Shirazi School is now operational.',
      isImportant: true,
    },
    {
      id: 'ann-2',
      titleFa: 'بخشنامه ساعات حضور و قوانین انضباطی مدرسه',
      titleEn: 'School Attendance Hours & Conduct Regulations',
      dateFa: '۲۵ مهر ۱۴۰۳',
      dateEn: 'October 16, 2024',
      categoryFa: 'انضباطی',
      categoryEn: 'Regulations',
      summaryFa: 'حضور دانش‌آموزان در تمامی روزهای تحصیلی از ساعت ۷:۴۵ صبح الزامی بوده و تاخیرها در سامانه ثبت می‌شود.',
      summaryEn: 'Students are expected to arrive by 7:45 AM on all school days. Tardiness will be recorded in the system.',
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>{t.nav.announcements}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.nav.announcements}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.home.announcementsCardDesc}
          </p>
        </div>

        {/* Mode Toggle for testing real notice vs empty state */}
        <button
          onClick={() => setShowDemoAnnouncements(!showDemoAnnouncements)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>
            {showDemoAnnouncements
              ? (lang === 'fa' ? 'نمایش حالت بدون اطلاعیه' : 'Show Empty State')
              : (lang === 'fa' ? 'پیش‌نمایش اطلاعیه‌های نمونه' : 'Preview Demo Notices')}
          </span>
        </button>
      </div>

      {/* Main Content */}
      {!showDemoAnnouncements ? (
        // MANDATORY REQUIREMENT 8 EMPTY STATE
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-10 text-center shadow-sm max-w-xl mx-auto my-8"
        >
          <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-200 dark:border-rose-800 shadow-sm">
            <Bell className="w-8 h-8" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
            {t.status.noAnnouncements}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'fa'
              ? 'بخشنامه‌ها، خبرها و اطلاعیه‌های رسمی مدرسه پس از تایید مدیریت در این صفحه قرار خواهند گرفت.'
              : 'Official school circulars and announcements will appear here once published by school administration.'}
          </p>
        </motion.div>
      ) : (
        // Active Announcements Cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officialAnnouncements.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden space-y-3"
            >
              {item.isImportant && (
                <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rtl:rounded-bl-none rtl:rounded-br-xl flex items-center gap-1">
                  <Pin className="w-3 h-3" />
                  <span>{lang === 'fa' ? 'مهم' : 'Important'}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                  <Tag className="w-3 h-3 text-indigo-500" />
                  <span>{lang === 'fa' ? item.categoryFa : item.categoryEn}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{lang === 'fa' ? item.dateFa : item.dateEn}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {lang === 'fa' ? item.titleFa : item.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'fa' ? item.summaryFa : item.summaryEn}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
