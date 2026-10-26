import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, ThemeMode, StudentProfile, ViewState } from '../types';
import { getTranslation } from '../locales/translations';

interface AppContextType {
  lang: Language;
  theme: ThemeMode;
  student: StudentProfile | null;
  currentView: ViewState;
  t: ReturnType<typeof getTranslation>;
  setLang: (lang: Language) => void;
  setTheme: (theme: ThemeMode) => void;
  setStudent: (student: StudentProfile | null) => void;
  setCurrentView: (view: ViewState) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State with localStorage
  const [lang, setLangState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('sayyad_school_lang');
    return (savedLang === 'en' || savedLang === 'fa') ? savedLang : 'fa';
  });

  // 2. Theme State with localStorage
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('sayyad_school_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    // Check user system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // 3. Student Profile State with localStorage
  const [student, setStudentState] = useState<StudentProfile | null>(() => {
    try {
      const savedStudent = localStorage.getItem('sayyad_school_student');
      return savedStudent ? JSON.parse(savedStudent) : null;
    } catch {
      return null;
    }
  });

  // 4. View State
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Sync Language changes to DOM (lang attribute, dir attribute) & localStorage
  useEffect(() => {
    localStorage.setItem('sayyad_school_lang', lang);
    const dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // Sync Theme changes to DOM class & localStorage
  useEffect(() => {
    localStorage.setItem('sayyad_school_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Setters
  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setStudent = (newStudent: StudentProfile | null) => {
    setStudentState(newStudent);
    if (newStudent) {
      localStorage.setItem('sayyad_school_student', JSON.stringify(newStudent));
    } else {
      localStorage.removeItem('sayyad_school_student');
    }
  };

  const logout = () => {
    setStudentState(null);
    localStorage.removeItem('sayyad_school_student');
    setCurrentView('home');
  };

  const t = getTranslation(lang);

  return (
    <AppContext.Provider
      value={{
        lang,
        theme,
        student,
        currentView,
        t,
        setLang,
        setTheme,
        setStudent,
        setCurrentView,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
