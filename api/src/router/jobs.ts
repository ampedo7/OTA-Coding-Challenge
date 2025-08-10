import express from 'express';

import {
  getAllJobs,
  postJobs,
  getPendingJobs,
  changeJobStatus,
  verifyPost
} from '../controllers/jobs';

export default (router: express.Router) => {
  router.get('/jobs', getAllJobs);
  router.get('/jobs/pending', getPendingJobs);
  router.post('/jobs', postJobs);
  router.patch('/jobs/:id/status', changeJobStatus);
  router.get('/jobs/verify', verifyPost);
};
