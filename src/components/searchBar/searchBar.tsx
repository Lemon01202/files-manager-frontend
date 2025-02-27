import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { folderStore } from 'stores/folderStore';
import { fileStore } from 'stores/fileStore';
import { useDebounce } from 'hooks/useDebounce';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    folderStore.loadFolders(folderStore.currentFolderId, debouncedSearchQuery);
    fileStore.loadFiles(folderStore.currentFolderId, debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <Box my={2}>
      <TextField
        label="Search files and folders..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
