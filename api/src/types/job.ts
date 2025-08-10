import { v4 as uuidv4 } from 'uuid';

export type JobDescription = {
  name: string;
  value: string; // HTML string
};

export type JobData = {
  name: string;
  jobDescriptions: JobDescription[];
};
