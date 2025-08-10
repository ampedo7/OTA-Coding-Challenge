import { QueryInterface, QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

type Job = {
  id: string;
  name: string;
  slug: string;
};

async function getJobs(queryInterface: QueryInterface) {
  // Get all job IDs from jobs table
  const jobs = await queryInterface.sequelize.query<{
    id: string;
    name: string;
    slug: string;
  }>(`SELECT id, name, slug FROM jobs`, {
    type: QueryTypes.SELECT
  });

  if (!jobs.length) {
    console.warn('⚠️ No jobs found. Please run jobs seeder first.');
    return;
  }

  return jobs;
}

async function getMrgeJobs() {
  const response = await axios.get(
    'https://mrge-group-gmbh.jobs.personio.de/xml',
    {
      responseType: 'text'
    }
  );

  const xmlData = response.data;
  const jsonData = await parseStringPromise(xmlData, {
    explicitArray: false
  });

  const jobs = jsonData['workzag-jobs'].position;

  return jobs;
}

function findBySlug(array: Job[] = [], slug: string): Job | undefined {
  const normalize = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, '-');

  return array.find((j) => normalize(j.slug) === normalize(slug));
}

export async function up(queryInterface: QueryInterface) {
  const jobs = await getJobs(queryInterface);
  const mrgeJobs = await getMrgeJobs();

  type JobDescriptionSeed = {
    id: string;
    jobs_id: string;
    name: string;
    value: string;
    created_at: Date;
    updated_at: Date;
  };

  let jobDescriptionData: JobDescriptionSeed[] = [];

  mrgeJobs.forEach((mrgeJob: any) => {
    const slug = mrgeJob.name.toLowerCase().trim().replace(/\s+/g, '-');
    const findJob = findBySlug(jobs, slug);

    if (findJob) {
      const jobDescription = mrgeJob.jobDescriptions.jobDescription;

      jobDescription.forEach((jobDesc: any) => {
        const jobId = findJob?.id;

        console.log('jobDesc ', jobDesc);
        console.log('jobId ', jobId);

        jobDescriptionData.push({
          id: uuidv4(),
          jobs_id: jobId,
          name: jobDesc.name,
          value: jobDesc.value.trim(),
          created_at: new Date(),
          updated_at: new Date()
        });
      });
    }
  });

  await queryInterface.bulkInsert('job_description', jobDescriptionData, {});

  console.log('✅ Inserted Job Descriptions:', jobDescriptionData.length);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('job_description', {});
}
