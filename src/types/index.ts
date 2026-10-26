export type Language = 'fa' | 'en';
export type ThemeMode = 'light' | 'dark';

export type Grade = '7' | '8' | '9';
export type ClassSection = 'A' | 'B' | 'C';

export interface StudentProfile {
  fullName: string;
  grade: Grade;
  classSection: ClassSection;
  loginTime?: string;
}

export type ViewState = 
  | 'home' 
  | 'schedule' 
  | 'assignments' 
  | 'grades' 
  | 'attendance' 
  | 'announcements' 
  | 'settings';

export interface AnnouncementItem {
  id: string;
  titleFa: string;
  titleEn: string;
  dateFa: string;
  dateEn: string;
  categoryFa: string;
  categoryEn: string;
  summaryFa: string;
  summaryEn: string;
  isImportant?: boolean;
}
