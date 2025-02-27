import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { FolderProps } from 'types/folderTypes';
import FolderItem from "components/foldersList/folderItem/folderItem";
import DeleteFolderModal from "components/modals/deleteFolderModal";
import EditFolderModal from "components/modals/editFolderModal";

  interface FoldersListProps {
    folders: FolderProps[];
    onCreateFolder: () => void;
    onDeleteFolder: (folderId: number) => void;
    onEditFolder: (folderId: number, newFolderName: string) => void;
    onFolderSelect: (folderId: number) => void;
  }

const FoldersList: React.FC<FoldersListProps> = ({
  folders,
  onCreateFolder,
  onDeleteFolder,
  onEditFolder,
  onFolderSelect,
}) => {
  const [folderToDelete, setFolderToDelete] = useState<number | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<number | null>(null);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleFolderDoubleClick = (folderId: number) => {
    onFolderSelect(folderId);
  };

  const handleFolderClick = (folderId: number) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleFolderDoubleClick(folderId);
    } else {
      setClickTimeout(setTimeout(() => setClickTimeout(null), 300));
    }
  };

  return (
    <Box my={2}>
      <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
        <Typography variant="h6">Folders</Typography>
        <IconButton color="primary" onClick={onCreateFolder}>
          <Add />
        </IconButton>
      </Box>

      {folders.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {folders.map((folder) => (
            <Box key={folder.id}>
              <FolderItem
                folder={folder}
                onEdit={(folderId) => setFolderToEdit(folderId)}
                onDelete={(folderId) => setFolderToDelete(folderId)}
                onClick={handleFolderClick}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography>No folders available</Typography>
      )}

      <DeleteFolderModal
        isOpen={!!folderToDelete}
        onClose={() => setFolderToDelete(null)}
        onConfirm={() => {
          if (folderToDelete !== null) {
            onDeleteFolder(folderToDelete);
            setFolderToDelete(null);
          }
        }}
        folderName={folders.find((f) => f.id === folderToDelete)?.folderName}
      />

      <EditFolderModal
        isOpen={folderToEdit !== null}
        onClose={() => setFolderToEdit(null)}
        onSave={(folderName) => {
          if (folderToEdit !== null) {
            onEditFolder(folderToEdit, folderName);
          }
        }}
        initialFolderName={folders.find((f) => f.id === folderToEdit)?.folderName || ''}
      />
    </Box>
  );
};

export default FoldersList;
