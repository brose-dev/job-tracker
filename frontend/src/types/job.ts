export type Status = 'monitoring' | 'applied' | 'interviewing' | 'passed' | 'rejected';
export type RemoteType = 'remote' | 'hybrid' | 'onsite';

export interface Job {
    id: number;
    company: string;
    title: string;
    location: string;
    remote_type: RemoteType;
    salary_min: number | null;
    salary_max: number | null;
    status: Status;
    fit_score: number | null;
    source_url: string;
    date_added: string;
    date_applied: string | null;
    notes: string;
}

export type JobFormData = Omit<Job, 'id' | 'date_added'>;
