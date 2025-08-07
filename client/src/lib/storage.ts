import { KidProfile, ActivityFilters } from "@shared/schema";

const STORAGE_KEYS = {
  KID_PROFILE: 'playspark_kid_profile',
  FILTERS: 'playspark_filters',
  ONBOARDING_COMPLETE: 'playspark_onboarding_complete',
  SETTINGS: 'playspark_settings'
};

export interface AppSettings {
  notifications: boolean;
  quickMode: boolean;
}

export const localStorageService = {
  // Kid Profile
  getKidProfile(): KidProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.KID_PROFILE);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  setKidProfile(profile: KidProfile): void {
    localStorage.setItem(STORAGE_KEYS.KID_PROFILE, JSON.stringify(profile));
  },

  // Filters
  getFilters(): Partial<ActivityFilters> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FILTERS);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  setFilters(filters: Partial<ActivityFilters>): void {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  },

  // Onboarding
  isOnboardingComplete(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
  },

  setOnboardingComplete(complete: boolean): void {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, complete.toString());
  },

  // Settings
  getSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : { notifications: false, quickMode: false };
    } catch {
      return { notifications: false, quickMode: false };
    }
  },

  setSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Clear all data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

export const calculateAge = (birthMonth: string, birthYear: number): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const birthMonthIndex = months.indexOf(birthMonth.toLowerCase());
  let age = currentYear - birthYear;
  
  if (currentMonth < birthMonthIndex) {
    age--;
  }
  
  return Math.max(0, age);
};
