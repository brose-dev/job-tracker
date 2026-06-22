import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import JobForm from './pages/JobForm';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '960px', margin: '40px auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/new" element={<JobForm />} />
          <Route path="/jobs/:id/edit" element={<JobForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
