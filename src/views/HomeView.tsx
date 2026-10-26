import React from 'react';
import { useApp } from '../context/AppContext';
import { ViewState } from '../types';
import {
  Calendar,
  FileText,
  Award,
  UserCheck,
  Bell,
  Settings,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC<{ onOpenLogin: () => void }> = ({ onOpenLogin }) => {
  const { lang, student, t, setCurrentView } = useApp();

  const heroImagePath = "/src/assets/images/school_hero_banner_1793028183945.jpg";
  const emblemImagePath = "/src/assets/images/school_emblem_logo_1793028183920.jpg";

  const featureCards: {
    id: ViewState;
    title: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    badge?: string;
  }[] = [
    {
      id: 'schedule',
      title: t.nav.schedule,
      desc: t.home.scheduleCardDesc,
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'assignments',
      title: t.nav.assignments,
      desc: t.home.assignmentsCardDesc,
      icon: <FileText className="w-6 h-6" />,
      color: 'from-indigo-600 to-purple-600',
      badge: t.status.comingSoon,
    },
    {
      id: 'grades',
      title: t.nav.grades,
      desc: t.home.gradesCardDesc,
      icon: <Award className="w-6 h-6" />,
      color: 'from-emerald-600 to-teal-600',
      badge: t.status.comingSoon,
    },
    {
      id: 'attendance',
      title: t.nav.attendance,
      desc: t.home.attendanceCardDesc,
      icon: <UserCheck className="w-6 h-6" />,
      color: 'from-amber-600 to-orange-600',
      badge: t.status.comingSoon,
    },
    {
      id: 'announcements',
      title: t.nav.announcements,
      desc: t.home.announcementsCardDesc,
      icon: <Bell className="w-6 h-6" />,
      color: 'from-rose-600 to-pink-600',
    },
    {
      id: 'settings',
      title: t.nav.settings,
      desc: t.home.settingsCardDesc,
      icon: <Settings className="w-6 h-6" />,
      color: 'from-slate-700 to-slate-900',
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      
      {/* 1. Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/40 z-10" />
        <img
          src={heroImagePath}
          alt={lang === 'fa' ? t.schoolName : t.schoolNameEn}
          referrerPolicy="no-referrer"
          className="w-full h-80 sm:h-96 object-cover object-center"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={emblemImagePath}
                alt="School Emblem"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full border-2 border-white/80 shadow-md bg-white p-0.5 object-cover"
              />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  {lang === 'fa' ? 'مدرسه نمونه دولتی' : 'Public Model School'}
                </span>
                <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                  {lang === 'fa' ? t.schoolName : t.schoolNameEn}
                </h1>
              </div>
            </div>

            {student && (
              <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                <GraduationCap className="w-5 h-5 text-indigo-300" />
                <div className="text-end">
                  <p className="text-xs font-bold text-white">{student.fullName}</p>
                  <p className="text-[11px] text-indigo-200">
                    {t.login.gradeLabel}: {student.grade} | {t.login.classLabel}: {student.classSection}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-2xl space-y-3">
            {student ? (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 backdrop-blur-md border border-indigo-400/40 text-indigo-200 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.home.welcome} {student.fullName}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  {t.home.welcomeSubtitle} ({student.grade}/{student.classSection})
                </h2>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
                  {lang === 'fa' ? 'پورتال جامع آموزشی و دانش‌آموزی' : 'Comprehensive Student Educational Portal'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl">
                  {t.portalSubtitle}
                </p>
              </div>
            )}

            {!student && (
              <div className="pt-2">
                <button
                  onClick={onOpenLogin}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2"
                >
                  <span>{t.login.submitBtn}</span>
                  {lang === 'fa' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Key School Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: t.home.totalGrades,
            value: t.home.gradeList,
            icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/60',
          },
          {
            title: t.home.totalClasses,
            value: t.home.classesCount,
            icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
            bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-800/60',
          },
          {
            title: t.home.academicYear,
            value: t.home.currentYear,
            icon: <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
            bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/60',
          },
          {
            title: t.home.systemStatus,
            value: t.home.statusOnline,
            icon: <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
            bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/60',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-2xl border ${stat.bgColor} flex items-center gap-3 shadow-sm transition-transform hover:-translate-y-0.5`}
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.title}</p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Quick Access Grid Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span>{t.home.quickAccessTitle}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView(card.id)}
              className="group text-start p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md`}>
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {card.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                <span>{lang === 'fa' ? 'ورود به صفحه' : 'Open Section'}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 4. Latest Notice Snippet */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-500" />
            <span>{t.home.noticeBannerTitle}</span>
          </h3>
          <button
            onClick={() => setCurrentView('announcements')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {lang === 'fa' ? 'مشاهده همه' : 'View All'}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            {t.status.noAnnouncements}
          </p>
        </div>
      </div>
    </div>
  );
};
