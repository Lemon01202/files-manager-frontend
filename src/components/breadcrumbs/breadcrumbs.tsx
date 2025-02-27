import React from 'react';
import { observer } from "mobx-react-lite";
import {Box, Breadcrumbs, Link, Typography} from '@mui/material';
import { FolderProps } from "types/folderTypes";

interface BreadcrumbsNavProps {
  breadcrumbs: FolderProps[];
  onFolderClick: (folderId: number | null) => void;
}

const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = observer(({ breadcrumbs, onFolderClick }) => {
  if(breadcrumbs.length === 0) {
    return <Box p={2} />;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 8 }}>
      <Link
        color="inherit"
        onClick={() => onFolderClick(null)}
        sx={{ cursor: 'pointer' }}
      >
        Home
      </Link>
      {breadcrumbs.map((folder, index) =>
        index === breadcrumbs.length - 1 ? (
          <Typography key={folder.id} color="textPrimary">
            {folder.folderName}
          </Typography>
        ) : (
          <Link
            key={folder.id}
            color="inherit"
            onClick={() => onFolderClick(folder.id)}
            sx={{ cursor: 'pointer' }}
          >
            {folder.folderName}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
});

export default BreadcrumbsNav;
