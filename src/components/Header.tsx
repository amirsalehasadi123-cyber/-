import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ViewState } from '../types';
import {
  Home,
  Calendar,
  FileText,
  Award,
  UserCheck,
  Bell,
  Settings,
  Sun,
  Moon,
  Globe,
  User,
  LogOut,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

export const Header: React.FC<{ onOpenLogin: () => void }> = ({ onOpenLogin }) => {
  const { lang, theme, student, currentView, t, setLang, setTheme, setCurrentView, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Home className="w-4 h-4" /> },
    { id: 'schedule', label: t.nav.schedule, icon: <Calendar className="w-4 h-4" /> },
    { id: 'assignments', label: t.nav.assignments, icon: <FileText className="w-4 h-4" /> },
    { id: 'grades', label: t.nav.grades, icon: <Award className="w-4 h-4" /> },
    { id: 'attendance', label: t.nav.attendance, icon: <UserCheck className="w-4 h-4" /> },
    { id: 'announcements', label: t.nav.announcements, icon: <Bell className="w-4 h-4" /> },
    { id: 'settings', label: t.nav.settings, icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ViewState) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-right text-slate-900 dark:text-white hover:opacity-90 transition-opacity focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-500 dark:to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-start">
                <span className="font-bold text-base sm:text-lg leading-tight tracking-tight whitespace-nowrap">
                  {lang === 'fa' ? t.schoolName : t.schoolNameEn}
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium whitespace-nowrap hidden xs:inline">
                  {lang === 'fa' ? 'سامانه جامع آموزشی' : 'Smart Educational Portal'}
                </span>
              </div>
            </button>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Actions & Quick Toggles */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Quick Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'light' ? t.settings.darkMode : t.settings.lightMode}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* Quick Language Toggle */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              title="Change Language / تغییر زبان"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>{lang === 'fa' ? 'EN' : 'FA'}</span>
            </button>

            {/* Student Profile Action */}
            {student ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{student.fullName}</span>
                  <span className="bg-indigo-600 text-white dark:bg-indigo-500 text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {student.grade}/{student.classSection}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title={t.login.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-sm whitespace-nowrap"
              >
                {t.login.submitBtn}
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {student && (
            <div className="mb-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {student.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{student.fullName}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t.login.gradeLabel}: {student.grade} - {t.login.classLabel}: {student.classSection}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-medium underline"
              >
                {t.login.switchUser}
              </button>
            </div>
          )}

          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
