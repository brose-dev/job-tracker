import { useEffect, useState } from "react";
import type { Job, Status } from "../types/job";
import { getJobs, deleteJob } from "../api/jobs";
import { useNavigate } from "react-router-dom";

const STATUS_LABELS: Record<Status, string> = {
    monitoring: 'Monitoring',
    applied: 'Applied',
    interviewing: 'Interviewing',
    passed: 'Passed',
    rejected: 'Rejected',
};

export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filter, setFilter] = useState<Status | ''>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getJobs().then((data) => {
            console.log('data', data);
            setJobs(data);
            setLoading(false);
        }).catch((err) => {
            console.error('error', err);
            setLoading(false);
        });
    }, []);

    const filtered = filter ? jobs.filter((j) => j.status === filter) : jobs;

    const handleDelete = async (id: number) => {
        if(!confirm('Delete this job?')) return;
        await deleteJob(id);
        setJobs(jobs.filter((j) => j.id !== id));
    };

    const navigate = useNavigate();

    if(loading) return <p>Loading...</p>;

    return(
        <div>
            <h1>Job Tracker</h1>
            <button onClick={() => navigate('/jobs/new')} style={{ marginBottom: '16px' }}>Add Job</button>

            <div style={{ marginBottom: '16px'}} >
                <button onClick={() => setFilter('')}>All</button>
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value as Status)}
                            style={{ marginLeft: '8px', fontWeight: filter === value ? 'bold' : 'normal'}}
                        >
                            {label}
                        </button>
                    ))}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Fit</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((job) => (
                        <tr key={job.id}>
                            <td style={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs/${job.id}`)}>
                                {job.company}
                            </td>
                            <td>{job.title}</td>
                            <td>{STATUS_LABELS[job.status]}</td>
                            <td>{job.fit_score ? `${job.fit_score}%` : '—'}</td>
                            <td>{job.location} ({job.remote_type})</td>
                            <td>
                                {job.salary_min || job.salary_max
                                ? `$${job.salary_min ? Math.round(job.salary_min / 1000) : '?'}k – $${job.salary_max ? Math.round(job.salary_max / 1000) : '?'}k`
                                : '—'}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(job.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr><td colSpan={7}>No jobs found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
