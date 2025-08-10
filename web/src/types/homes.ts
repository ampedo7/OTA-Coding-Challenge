export interface JOBDESCRIPTION {
  id: string;
  name: string;
  value: string;
}

export interface JOBSDATA {
  id: string;
  subcompany: string;
  office: string;
  department: string;
  name: string;
  employmentType: string;
  seniority: string;
  schedule: string;
  yearsOfExperience: string;
  keywords: string;
  occupation: string;
  occupationCategory: string;
  status: string;
  jobDescriptions: JOBDESCRIPTION[];
}

export interface GenericResponse<Data = any> {
  status: number;
  message?: string;
  data?: Data;
}

export type getJobPayload = GenericResponse<{
  data: JOBSDATA[];
}>;
