import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button
} from '@mui/material';
import { Delete, Edit, Share, Lock, LockOpen, Save, Cancel } from '@mui/icons-material';
import { File } from 'types/fileTypes';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import { observer } from "mobx-react-lite";

interface FileItemProps {
  file: File;
  onDelete: (fileId: number) => void;
  onSaveEdit: (fileId: number, newFileName: string, isPublic: boolean) => void;
  onShare: (file: File) => void;
  onSetPrivacy: (fileId: number, isPublic: boolean) => void;
  onPreview: (file: File) => void;
  backendUrl: string;
  isEditing: boolean;
  onCancelEdit: () => void;
  onStartEdit: () => void;
}

const FileItem: React.FC<FileItemProps> = observer(({
  file,
  onDelete,
  onSaveEdit,
  onShare,
  onSetPrivacy,
  onPreview,
  backendUrl,
  isEditing,
  onCancelEdit,
  onStartEdit,
}) => {
  const [hovered, setHovered] = useState(false);
  const [editedFileName, setEditedFileName] = useState(file.fileName);
  const [editedIsPublic, setEditedIsPublic] = useState(file.isPublic);

  const filePathWithBase = `${backendUrl}/${file.filePath}`;

  const handleSave = () => {
    onSaveEdit(file.id, editedFileName, editedIsPublic);
  };

  return (
    <Card>
      <CardContent>
        <div
          style={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
            position: 'relative',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => !isEditing && onPreview(file)}
        >
          {!isEditing ? (
            <>
              {file.mimeType.startsWith('image/') ? (
                <img
                  src={filePathWithBase}
                  alt={file.fileName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                />
              ) : file.mimeType.startsWith('video/') ? (
                <video controls style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }}>
                  <source src={filePathWithBase} type={file.mimeType} />
                </video>
              ) : file.mimeType === 'application/pdf' ? (
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                  <PictureAsPdfIcon style={{ fontSize: 50, color: 'red' }} />
                  <Typography variant="body2" mt={1}>
                    {file.fileName}
                  </Typography>
                </Box>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                  <InsertDriveFile style={{ fontSize: 50 }} />
                  <Typography variant="body2" mt={1}>
                    {file.fileName}
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ p: 2, width: '100%' }}>
              <TextField
                fullWidth
                value={editedFileName}
                onChange={(e) => setEditedFileName(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editedIsPublic}
                    onChange={(e) => setEditedIsPublic(e.target.checked)}
                    color="primary"
                  />
                }
                label="Public"
              />
              <Box display="flex" gap={1} mt={2}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  size="small"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={onCancelEdit}
                  size="small"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          {!isEditing && hovered && (
            <Box style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '8px' }}>
              {file.actions.includes('edit') && (
                <>
                  <IconButton
                    style={{ backgroundColor: 'white' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditedFileName(file.fileName);
                      setEditedIsPublic(file.isPublic);
                      onStartEdit();
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    style={{ backgroundColor: 'white' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(file.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    style={{ backgroundColor: 'white' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(file);
                    }}
                  >
                    <Share />
                  </IconButton>
                  <IconButton
                    style={{ backgroundColor: 'white' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetPrivacy(file.id, !file.isPublic);
                    }}
                  >
                    {file.isPublic ? <LockOpen /> : <Lock />}
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </div>
      </CardContent>
      {!isEditing && (
        <Typography variant="body2" noWrap m={2}>
          {file.fileName}
        </Typography>
      )}
    </Card>
  );
});

export default FileItem;
