export interface File {
  id: number;
  fileName: string;
  filePath: string;
  size: number;
  mimeType: string;
  isPublic: boolean;
  actions: 'view' | 'edit';
}

export interface FileUploadResponse {
  id: number;
  fileName: string;
}

export interface FileSearchParams {
  name: string;
  folderId?: number;
}
