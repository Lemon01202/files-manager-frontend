import apiClient from './baseService';
import { toast } from 'react-toastify';
import {FolderProps} from "types/folderTypes";

export const FolderService = {
  async getRootFolders(name?: string): Promise<FolderProps[]> {
    try {
      const params = name ? { name } : {};
      const response = await apiClient.get('/folders', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getChildFolders(parentFolderId: number, name?: string): Promise<FolderProps[]> {
    try {
      const params = name ? { name } : {};
      const response = await apiClient.get(`/folders/${parentFolderId}`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllFolders(): Promise<FolderProps[]> {
    try {
      const response = await apiClient.get('/folders/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createFolder(folderName: string, parentFolderId?: number) {
    try {
      const response = await apiClient.post('/folders/create', {
        folderName,
        parentFolderId: parentFolderId || null,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteFolder(folderId: number) {
    try {
      await apiClient.delete(`/folders/${folderId}`);
    } catch (error) {
      throw error;
    }
  },

  async updateFolder(folderId: number, newFolderName: string) {
    try {
      const response = await apiClient.put(`/folders/${folderId}`, {
        folderName: newFolderName,
      });
      toast.success('Folder updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
