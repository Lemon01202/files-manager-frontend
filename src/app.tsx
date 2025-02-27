import React from 'react';
import AppRouter from "routes/appRouter";
import {AuthProvider} from "components/context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
