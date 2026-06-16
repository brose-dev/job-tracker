import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Job } from '../types/job';
import { getJob, deleteJob } from '../api/jobs';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJob(Number(id)).then((data) => {
      setJob(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this job?')) return;
    await deleteJob(Number(id));
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <button onClick={() => navigate(`/jobs/${id}/edit`)} style={{ marginRight: '8px' }}>Edit</button>
      <h2 style={{ color: '#555', fontWeight: 'normal' }}>{job.company}</h2>

      <table style={{ width: 'auto', marginBottom: '24px' }}>
        <tbody>
          <tr><th>Status</th><td>{job.status}</td></tr>
          <tr><th>Fit Score</th><td>{job.fit_score ? `${job.fit_score}%` : '—'}</td></tr>
          <tr><th>Location</th><td>{job.location} ({job.remote_type})</td></tr>
          <tr><th>Salary</th><td>
            {job.salary_min || job.salary_max
              ? `$${job.salary_min ? Math.round(job.salary_min / 1000) : '?'}k – $${job.salary_max ? Math.round(job.salary_max / 1000) : '?'}k`
              : 'Not listed'}
          </td></tr>
          <tr><th>Date Added</th><td>{job.date_added}</td></tr>
          <tr><th>Date Applied</th><td>{job.date_applied ?? '—'}</td></tr>
          {job.source_url && (
            <tr><th>Link</th><td><a href={job.source_url} target="_blank">View Posting</a></td></tr>
          )}
        </tbody>
      </table>

      {job.notes && (
        <>
          <h3>Notes</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{job.notes}</p>
        </>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate('/')}>Back</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
