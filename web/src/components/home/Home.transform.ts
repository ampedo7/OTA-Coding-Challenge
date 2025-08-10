import { JOBSDATA } from 'types/homes';
export const jobListDetail = (data: JOBSDATA[]) => {
  return data.map((job) => ({
    id: job.id,
    subcompany: job.subcompany,
    office: job.office,
    department: job.department,
    name: job.name,
    seniority: job.seniority,
    schedule: job.schedule,
    yearsOfExperience: job.yearsOfExperience,
    keywords: job.keywords,
    occupation: job.occupation,
    occupationCategory: job.occupationCategory,
    status: job.status,
    jobDescriptions: job.jobDescriptions
  }));
};
