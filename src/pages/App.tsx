import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Novels from './novels';
import Statistics from './statistics';
import Editor from './editor';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Novels />} />
          <Route path="/novels" element={<Novels />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
