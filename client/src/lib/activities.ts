import { Activity, ActivityFilters } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export interface GenerateActivitiesRequest {
  filters: Partial<ActivityFilters>;
  interests: string[];
  age: number;
}

export const activitiesService = {
  async generateActivities(request: GenerateActivitiesRequest): Promise<Activity[]> {
    const response = await apiRequest('POST', '/api/activities/generate', request);
    return response.json();
  },

  async getAllActivities(): Promise<Activity[]> {
    const response = await apiRequest('GET', '/api/activities');
    return response.json();
  },

  async getSavedActivities(): Promise<any[]> {
    const response = await apiRequest('GET', '/api/saved-activities');
    return response.json();
  },

  async saveActivity(activityId: string): Promise<any> {
    const response = await apiRequest('POST', '/api/saved-activities', { activityId });
    return response.json();
  },

  async removeSavedActivity(savedActivityId: string): Promise<void> {
    await apiRequest('DELETE', `/api/saved-activities/${savedActivityId}`);
  },

  async markActivityAsUsed(savedActivityId: string, isUsed: boolean): Promise<void> {
    await apiRequest('PATCH', `/api/saved-activities/${savedActivityId}/used`, { isUsed });
  }
};

export const INTERESTS = [
  { id: 'arts', name: 'Arts & Crafts', icon: 'fas fa-palette' },
  { id: 'sports', name: 'Sports', icon: 'fas fa-running' },
  { id: 'science', name: 'Science', icon: 'fas fa-microscope' },
  { id: 'music', name: 'Music', icon: 'fas fa-music' },
  { id: 'reading', name: 'Reading', icon: 'fas fa-book' },
  { id: 'outdoor', name: 'Outdoor', icon: 'fas fa-tree' },
  { id: 'movement', name: 'Movement', icon: 'fas fa-running' },
  { id: 'creative', name: 'Creative', icon: 'fas fa-lightbulb' }
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const YEARS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);
