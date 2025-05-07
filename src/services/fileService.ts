import apiClient from './baseService';
import { toast } from 'react-toastify';

interface ShareFileAccessRequest {
  email: string;
  permission: 'view' | 'edit';
}

interface GetFilesByFolderParams {
  name?: string;
}

export const FileService = {
  async uploadFile(file: File, isPublic: boolean, folderId?: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isPublic', isPublic.toString());
    if (folderId) {
      formData.append('folderId', folderId.toString());
    }

    try {
      const response = await apiClient.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('File uploaded successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteFile(fileId: number) {
    try {
      await apiClient.delete(`/files/${fileId}`);
    } catch (error) {
      throw error;
    }
  },

  async updateFile(fileId: number, formData: FormData) {
    try {
      const response = await apiClient.patch(`/files/${fileId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async setFilePrivacy(fileId: number, isPublic: boolean) {
    try {
      const response = await apiClient.patch(`/files/${fileId}/privacy`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async shareFileAccess(fileId: number, email: string, permission: 'view' | 'edit') {
    const data: ShareFileAccessRequest = { email, permission };
    try {
      const response = await apiClient.post(`/files/${fileId}/share`, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getFilesByFolderId(folderId: number | null, name?: string) {
    try {
      const params: GetFilesByFolderParams = {};

      if (name) {
        params.name = name;
      }

      const id = folderId ?? 0;
      const response = await apiClient.get(`/files/by-folder/${id}`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
