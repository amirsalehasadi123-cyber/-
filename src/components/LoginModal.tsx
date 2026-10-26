import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Grade, ClassSection } from '../types';
import { User, GraduationCap, X, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { lang, student, t, setStudent, setCurrentView } = useApp();

  const [fullName, setFullName] = useState(student?.fullName || '');
  const [grade, setGrade] = useState<Grade | ''>(student?.grade || '7');
  const [classSection, setClassSection] = useState<ClassSection | ''>(student?.classSection || 'A');
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFullName(student.fullName);
      setGrade(student.grade);
      setClassSection(student.classSection);
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !grade || !classSection) {
      setError(t.login.validationError);
      return;
    }
    setError('');
    setStudent({
      fullName: fullName.trim(),
      grade: grade as Grade,
      classSection: classSection as ClassSection,
      loginTime: new Date().toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US'),
    });
    setCurrentView('home');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 overflow-hidden transition-colors"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.login.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.login.subtitle}
            </p>
          </div>

          {/* Important Security / Demo Disclaimer Note */}
          <div className="p-3 mb-6 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.login.disclaimerNote}
            </p>
          </div>

          {/* Validation Error Banner */}
          {error && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.login.fullNameLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t.login.fullNamePlaceholder}
                  className="w-full px-4 py-2.5 pl-10 rtl:pl-4 rtl:pr-10 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3" />
              </div>
            </div>

            {/* Grade Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.login.gradeLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '7', labelFa: t.login.grade7, labelEn: '7th Grade' },
                  { value: '8', labelFa: t.login.grade8, labelEn: '8th Grade' },
                  { value: '9', labelFa: t.login.grade9, labelEn: '9th Grade' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => {
                      setGrade(item.value as Grade);
                      if (error) setError('');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center justify-center gap-1.5 ${
                      grade === item.value
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {grade === item.value && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{lang === 'fa' ? item.labelFa : item.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Class Section Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.login.classLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'A', labelFa: t.login.classA, labelEn: 'Class A' },
                  { value: 'B', labelFa: t.login.classB, labelEn: 'Class B' },
                  { value: 'C', labelFa: t.login.classC, labelEn: 'Class C' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => {
                      setClassSection(item.value as ClassSection);
                      if (error) setError('');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center justify-center gap-1.5 ${
                      classSection === item.value
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {classSection === item.value && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{lang === 'fa' ? item.labelFa : item.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md shadow-indigo-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {t.login.submitBtn}
              </button>
            </div>
          </form>

          {/* Footer link to close */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {t.login.backHome}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
