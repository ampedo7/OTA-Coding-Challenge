import { JOBSDATA, getJobPayload } from 'types/homes';
import { apiCall } from 'services/api';

export const getJobListing = async (): Promise<getJobPayload> => {
  const jobList = await apiCall({
    method: 'get',
    url: '/api/jobs'
  });
  // console.log('jobList', jobList);
  return jobList;
};
