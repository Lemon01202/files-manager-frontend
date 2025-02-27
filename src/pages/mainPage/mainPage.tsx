import React from 'react';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from 'components/layouts/mainLayout';
import CreateEditFolderModal from 'components/modals/createEditFolderModal';
import Loader from 'components/loader/loader';
import SearchBar from 'components/searchBar/searchBar';
import FoldersList from 'components/foldersList/foldersList';
import BreadcrumbsNav from 'components/breadcrumbs/breadcrumbs';
import { folderStore } from 'stores/folderStore';
import FilesList from 'components/filesList/filesList';
import { fileStore } from 'stores/fileStore';
import UploadFileModal from 'components/modals/uploadFileModal';

const MainPage: React.FC = observer(() => {
  const handleOpenCreateFolderModal = (state: boolean) => {
    folderStore.setCreateFolderModalOpen(state);
  };

  const handleSaveFolder = async (folderName: string) => {
    await folderStore.createFolder(folderName, folderStore.currentFolderId);
  };

  const handleEditFolder = async (folderId: number, newFolderName: string) => {
    await folderStore.updateFolder(folderId, newFolderName);
  };

  const handleDeleteFolder = async (folderId: number) => {
    await folderStore.deleteFolder(folderId);
  };

  const handleFolderSelect = (folderId: number) => {
    folderStore.selectFolder(folderId);
    localStorage.setItem('currentFolder', String(folderId));
  };

  const handleBreadcrumbClick = (folderId: number) => {
    folderStore.selectFolder(folderId);
  };

  const handleOpenUploadFileModal = React.useCallback((state: boolean) => {
    fileStore.setUploadFileModalOpen(state);
  }, []);

  const handleEditFile = React.useCallback((fileId: number, file: any, isPublic: boolean) => {
    fileStore.updateFile(fileId, file, { isPublic });
  }, []);

  const handleShareFileAccess = React.useCallback((fileId: number, email: string, permission: 'view' | 'edit') => {
    fileStore.shareFileAccess(fileId, email, permission);
  }, []);

  const handleSetFilePrivacy = React.useCallback((fileId: number, isPublic: boolean) => {
    fileStore.setFilePrivacy(fileId, isPublic);
  }, []);

  const handleUploadFile = async (file: any, isPublic: boolean = false) => {
    await fileStore.uploadFile(file, isPublic, folderStore.currentFolderId);
    handleOpenUploadFileModal(false);
  };

  return (
    <MainLayout>
      <BreadcrumbsNav
        breadcrumbs={folderStore.breadcrumbTrail}
        onFolderClick={handleBreadcrumbClick}
      />

      <SearchBar />

      {folderStore.isLoading || fileStore.isLoading ? (
        <Loader />
      ) : (
        <>
          <FoldersList
            folders={folderStore.folders}
            onCreateFolder={() => handleOpenCreateFolderModal(true)}
            onDeleteFolder={handleDeleteFolder}
            onEditFolder={handleEditFolder}
            onFolderSelect={handleFolderSelect}
          />

          <FilesList
            files={fileStore.files}
            handleOpenUploadFileModal={handleOpenUploadFileModal}
            onDeleteFile={fileStore.deleteFile}
            onEditFile={handleEditFile}
            onShareFileAccess={handleShareFileAccess}
            onSetFilePrivacy={handleSetFilePrivacy}
          />
        </>
      )}

      <CreateEditFolderModal
        isCreateFolderModalOpen={folderStore.isCreateFolderModalOpen}
        handleOpenCreateFolderModal={handleOpenCreateFolderModal}
        handleSaveFolder={handleSaveFolder}
      />

      <UploadFileModal
        isUploadFileModalOpen={fileStore.isUploadFileModalOpen}
        handleOpenUploadFileModal={handleOpenUploadFileModal}
        handleUploadFile={handleUploadFile}
      />

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </MainLayout>
  );
});

export default MainPage;
