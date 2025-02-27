import React, { ReactNode } from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import {Container} from "@mui/system";

interface AuthLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">File Manager</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
};


export default MainLayout;
