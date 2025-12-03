import { apiClient } from './client';

export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'task';
  completed: boolean;
  deadline: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  type?: 'note' | 'task';
  deadline?: string | null;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  completed?: boolean;
  deadline?: string | null;
}

export const notesApi = {
  getAll: async (type?: 'note' | 'task'): Promise<Note[]> => {
    const params = type ? { type } : {};
    const response = await apiClient.get<Note[]>('/notes', { params });
    return response.data;
  },
  getById: async (id: string): Promise<Note> => {
    const response = await apiClient.get<Note>(`/notes/${id}`);
    return response.data;
  },
  create: async (data: CreateNoteData): Promise<Note> => {
    const response = await apiClient.post<Note>('/notes', data);
    return response.data;
  },
  update: async (id: string, data: UpdateNoteData): Promise<Note> => {
    const response = await apiClient.put<Note>(`/notes/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/notes/${id}`);
  },
};

