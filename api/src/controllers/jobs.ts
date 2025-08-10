import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import {
  getAllJobsWithDescriptions,
  getJobsByStatus,
  findJobBySlug,
  createJobWithDescription,
  updateJobStatusById
} from '../services/job/jobs';
import { sendEmail, generateHtmlTemplate } from '../services/email';
import { sendSuccess, sendError } from '../services/response';
import { setSlug, verifyJwtToken } from '../services/utils';
import juice from 'juice';
import { JwtPayload, VerifyResult } from '../types/jwtPayload';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await getAllJobsWithDescriptions();
    return sendSuccess(res, jobs);
  } catch (error) {
    return sendError(res, 'error', 400);
  }
};

export const getPendingJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await getJobsByStatus('pending');
    return sendSuccess(res, jobs);
  } catch (error) {
    console.log(error);
    return sendError(res, 'error', 400);
  }
};

export const postJobs = async (req: Request, res: Response) => {
  try {
    const {
      subcompany,
      office,
      department,
      recruitingCategory,
      name,
      employmentType,
      seniority,
      schedule,
      yearsOfExperience,
      keywords,
      occupation,
      occupationCategory,
      status,
      jobDescriptions
    } = req.body;

    const slug = setSlug(name);
    const existingJob = await findJobBySlug(slug); // check job by slug

    if (existingJob) {
      return sendError(res, 'Job already exists', 400);
    }

    const newJob = {
      id: uuidv4(),
      subcompany,
      office,
      department,
      recruitingCategory,
      name,
      employmentType,
      seniority,
      schedule,
      yearsOfExperience,
      keywords,
      occupation,
      occupationCategory,
      status
    };

    const job = await createJobWithDescription(newJob, jobDescriptions);

    const htmlTemplate = generateHtmlTemplate(newJob.id, job);

    await sendEmail(
      'otaexam2025@yopmail.com',
      'New Job Posted',
      juice(htmlTemplate)
    );

    // console.log(htmlTemplate);
    return sendSuccess(res, {
      job,
      htmlTemplate: htmlTemplate.trim()
    });
  } catch (error: any) {
    console.error('Error in postJobs:', error);

    if (error.type === 'DB_ERROR') {
      return sendError(res, error.message, 500);
    }

    return sendError(res, 'An unexpected error occurred', 500);
  }
};

export const verifyPost = async (req: Request, res: Response) => {
  try {
    const verificationKey = req.query.verificationKey as string;

    const varifyToken = verifyJwtToken(
      verificationKey
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTExODZhMS1jODM3LTRhNjAtYmFkZi00ZWI3MjJlNjYyMTQiLCJzdGF0dXMiOiJhcHByb3ZlZCIsImlhdCI6MTc1NDc0NDM0MCwiZXhwIjoxNzU0NzQ2MTQwfQ.hzfGOMQQGR3XaypUwy1IBiKB1s5cmiEFRcrPHlpTG7s'
    );

    if (!varifyToken.valid) {
      return sendError(res, varifyToken.error, 400);
    }

    const jobId = varifyToken.decoded?.jobId as string;
    const status = varifyToken.decoded?.status as string;

    const updatedJob = await updateJobStatusById(jobId, status);

    if (!updatedJob) {
      return sendError(res, 'Job not found', 404);
    }

    res.redirect('http://localhost:3000/');
    // return sendSuccess(res, { jobId, status });
  } catch (error) {
    console.error('Error updating job status:', error);
    return sendError(res, 'An unexpected error occurred', 500);
  }
};
export const changeJobStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedJob = await updateJobStatusById(id, status);

    if (!updatedJob) {
      return sendError(res, 'Job not found', 404);
    }

    return sendSuccess(res, updatedJob);
  } catch (error) {
    console.error('Error updating job status:', error);
    return sendError(res, 'An unexpected error occurred', 500);
  }
};
