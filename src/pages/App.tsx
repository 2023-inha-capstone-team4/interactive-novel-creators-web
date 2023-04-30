import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
import Novels from './novels';
import Statistics from './statistics';
import Editor from './editor';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/novels" element={<Novels />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
