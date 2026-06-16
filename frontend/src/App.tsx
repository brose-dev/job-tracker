import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobList from './pages/JobList';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '960px', margin: '40px auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<JobList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
