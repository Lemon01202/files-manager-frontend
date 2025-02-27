import { makeAutoObservable } from 'mobx';
import { FolderProps } from 'types/folderTypes';
import { FolderService } from 'services/folderService';
import { toast } from 'react-toastify';
import { fileStore } from './fileStore';

class FolderStore {
  folders: FolderProps[] = [];
  currentFolderId: number | null = null;
  breadcrumbTrail: FolderProps[] = [];
  isCreateFolderModalOpen: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFolders();
  }

  async loadFolders(folderId: number | null = null, name?: string) {
    this.isLoading = true;
    try {
      if (folderId === null) {
        this.folders = (await FolderService.getRootFolders(name)).sort((a, b) =>
          a.folderName.localeCompare(b.folderName),
        );
        this.breadcrumbTrail = [];
      } else {
        this.folders = (await FolderService.getChildFolders(folderId, name)).sort((a, b) =>
          a.folderName.localeCompare(b.folderName),
        );
        await this.updateBreadcrumbTrail(folderId);
      }
      this.currentFolderId = folderId;
    } catch (error) {
      toast.error('Error loading folders');
    } finally {
      this.isLoading = false;
    }
  }

  async updateBreadcrumbTrail(folderId: number) {
    try {
      const allFolders = await FolderService.getAllFolders();
      const path: FolderProps[] = [];
      let current = allFolders.find((folder) => folder.id === folderId);
      while (current) {
        path.unshift(current);
        if (current.parentFolderId === null) break;
        current = allFolders.find((folder) => folder.id === current.parentFolderId);
      }
      this.breadcrumbTrail = path;
    } catch (error) {
      toast.error('Error updating breadcrumb trail');
    }
  }

  async selectFolder(folderId: number) {
    await this.loadFolders(folderId);
    await fileStore.loadFiles(folderId);
  }

  setCreateFolderModalOpen(state: boolean) {
    this.isCreateFolderModalOpen = state;
  }

  async createFolder(folderName: string, parentFolderId: number | null) {
    try {
      await FolderService.createFolder(folderName, parentFolderId);
      await this.loadFolders(this.currentFolderId);
      toast.success('Folder created successfully!');
    } catch (error) {
      toast.error('Failed to create folder!');
      throw error;
    }
  }

  async updateFolder(folderId: number, newFolderName: string) {
    try {
      await FolderService.updateFolder(folderId, newFolderName);
      await this.loadFolders(this.currentFolderId);
    } catch (error) {
      toast.error('Failed to update folder!');
      throw error;
    }
  }

  async deleteFolder(folderId: number) {
    try {
      await FolderService.deleteFolder(folderId);
      await this.loadFolders(this.currentFolderId);
      toast.success('Folder deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete folder!');
      throw error;
    }
  }
}

export const folderStore = new FolderStore();
