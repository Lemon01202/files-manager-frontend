import { makeAutoObservable } from "mobx";
import { FileService } from "services/fileService";
import { toast } from "react-toastify";
import { folderStore } from "./folderStore";

class FileStore {
  files: any[] = [];
  isLoading: boolean = false;
  isUploadFileModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFiles = this.loadFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  async loadFiles(folderId: number | null = null, name?: string) {
    this.isLoading = true;
    try {
      this.files = await FileService.getFilesByFolderId(folderId, name);
    } catch (error) {
      toast.error("Error loading files");
    } finally {
      this.isLoading = false;
    }
  }

  async deleteFile(fileId: number) {
    try {
      await FileService.deleteFile(fileId);
      await this.loadFiles(folderStore.currentFolderId);
      toast.success("File deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete file");
    }
  }

  async uploadFile(file: File, isPublic: boolean, folderId: number | null) {
    try {
      await FileService.uploadFile(file, isPublic, folderId);
      await this.loadFiles(folderId);
    } catch (error) {
      toast.error("Failed to upload file");
    }
  }

  setUploadFileModalOpen(state: boolean) {
    this.isUploadFileModalOpen = state;
  }

  async updateFile(fileId: number, file: File | null, updateData: { isPublic?: boolean }) {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      formData.append('isPublic', String(updateData.isPublic || false));

      await FileService.updateFile(fileId, formData);
      await this.loadFiles(folderStore.currentFolderId);
      toast.success('File updated successfully!');
    } catch (error) {
      toast.error('Failed to update file');
    }
  }

  async setFilePrivacy(fileId: number, isPublic: boolean) {
    try {
      await FileService.setFilePrivacy(fileId, isPublic);
      const file = this.files.find((f) => f.id === fileId);
      if (file) {
        file.isPublic = isPublic;
      }
      toast.success('File privacy updated successfully!');
    } catch (error) {
      toast.error('Failed to update file privacy');
    }
  }

  async shareFileAccess(fileId: number, email: string, permission: 'view' | 'edit') {
    try {
      await FileService.shareFileAccess(fileId, email, permission);
      toast.success('File access shared successfully!');
    } catch (error) {
      toast.error('Failed to share file access');
    }
  }
}

export const fileStore = new FileStore();
