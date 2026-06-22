import axios from 'axios';
import type { Job, JobFormData } from '../types/job';

const API_URL = '/api/jobs/';

export const getJobs = async (): Promise<Job[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getJob = async(id: number): Promise<Job> => {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
};

export const createJob = async (data: JobFormData): Promise<Job> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateJob = async (id: number, data: JobFormData): Promise<Job> => {
    const response = await axios.put(`${API_URL}${id}/`, data);
    return response.data;
};

export const deleteJob = async (id: number):Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};
