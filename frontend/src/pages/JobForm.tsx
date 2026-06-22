import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { JobFormData } from '../types/job';
import { getJob, createJob, updateJob } from '../api/jobs';

const EMPTY_FORM: JobFormData = {
  company: '',
  title: '',
  location: '',
  remote_type: 'remote',
  salary_min: null,
  salary_max: null,
  status: 'monitoring',
  fit_score: null,
  source_url: '',
  date_applied: null,
  notes: '',
};

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<JobFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getJob(Number(id)).then((data) => {
      const { id: _, date_added: __, ...formData } = data;
      setForm(formData);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateJob(Number(id), form);
    } else {
      await createJob(form);
    }
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1>{isEdit ? 'Edit Job' : 'Add Job'}</h1>
      <form onSubmit={handleSubmit}>

        <label>Company</label>
        <input name="company" value={form.company} onChange={handleChange} required />

        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Location</label>
        <input name="location" value={form.location ?? ''} onChange={handleChange} />

        <label>Remote Type</label>
        <select name="remote_type" value={form.remote_type} onChange={handleChange}>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">Onsite</option>
        </select>

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="monitoring">Monitoring</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="passed">Passed</option>
          <option value="rejected">Rejected</option>
        </select>

        <label>Salary Min (in thousands)</label>
        <input name="salary_min" type="number" value={form.salary_min ?? ''} onChange={handleChange} />

        <label>Salary Max (in thousands)</label>
        <input name="salary_max" type="number" value={form.salary_max ?? ''} onChange={handleChange} />

        <label>Fit Score (0-100)</label>
        <input name="fit_score" type="number" value={form.fit_score ?? ''} onChange={handleChange} />

        <label>Source URL</label>
        <input name="source_url" value={form.source_url ?? ''} onChange={handleChange} />

        <label>Date Applied</label>
        <input name="date_applied" type="date" value={form.date_applied ?? ''} onChange={handleChange} />

        <label>Notes</label>
        <textarea name="notes" value={form.notes ?? ''} onChange={handleChange} rows={4} />

        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <button type="submit">{isEdit ? 'Save' : 'Add Job'}</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>

      </form>
    </div>
  );
}
