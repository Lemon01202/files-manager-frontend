import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography, Tooltip } from '@mui/material';
import { Folder, Delete, Edit } from '@mui/icons-material';
import { truncateString } from 'utils/truncateString';

interface FolderItemProps {
  folder: {
    id: number;
    folderName: string;
  };
  onEdit: (folderId: number) => void;
  onDelete: (folderId: number) => void;
  onClick: (folderId: number) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, onEdit, onDelete, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onClick={() => onClick(folder.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        minWidth: 180,
        maxWidth: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        pt: 2,
        pb: 1,
        height: 40,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <CardContent sx={{ position: 'relative', width: '100%' }}>
        {hovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onEdit(folder.id);
              }}
              sx={{ padding: 0 }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onDelete(folder.id);
              }}
              sx={{ padding: 0 }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
          <Folder sx={{ fontSize: 40 }} />
          <Tooltip title={folder.folderName} arrow>
            <Typography variant="body2">{truncateString(folder.folderName, 15)}</Typography>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FolderItem;
