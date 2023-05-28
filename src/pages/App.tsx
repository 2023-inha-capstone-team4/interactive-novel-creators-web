import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Novels from './novels';
import Statistics from './statistics';
import Editor from './editor';
import Signin from './signin';
import AuthRequired from './AuthRequired';
import { Snackbar, ThemeProvider, createTheme, Alert } from '@mui/material';
import { useState } from 'react';
import { AlertAPI, AlertAPIContext } from '@/utils/alert';
import CreateNovel from './createNovel';
import UpdateNovel from './updateNovel';

export default function App() {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlertClose = () => {
    setAlert(false);
    setAlertMessage('');
  };

  const showAlert: AlertAPI = (message: string) => {
    setAlertMessage(message);
    setAlert(true);
  };

  return (
    <>
      <AlertAPIContext.Provider value={showAlert}>
        <ThemeProvider theme={muiTheme}>
          <BrowserRouter>
            <AuthRequired ifNoAuth={<Signin />}>
              <Routes>
                <Route path="/" element={<Novels />} />
                <Route path="/novels" element={<Novels />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/novels/create" element={<CreateNovel />} />
                <Route path="/novels/:id/update" element={<UpdateNovel />} />
              </Routes>
            </AuthRequired>
          </BrowserRouter>
        </ThemeProvider>
      </AlertAPIContext.Provider>
      <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert severity="error">{alertMessage}</Alert>
      </Snackbar>
    </>
  );
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ff6868',
      contrastText: '#ffffff',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
