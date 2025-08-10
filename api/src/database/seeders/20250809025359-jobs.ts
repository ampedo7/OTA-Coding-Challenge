import { QueryInterface } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export async function up(queryInterface: QueryInterface) {
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

  type JobSeed = {
    id: string;
    subcompany: string;
    office: string;
    department: string;
    recruitingCategory: string;
    name: string;
    slug: string;
    employmentType: string;
    seniority: string;
    schedule: string;
    yearsOfExperience: string;
    keywords: string;
    occupation: string;
    occupationCategory: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  };

  let queryJobs: JobSeed[] = [];

  for (let index: number = 0; index < jobs.length; index++) {
    const job: JobSeed = jobs[index];
    const jobId = uuidv4();
    const slug = job.name.toLowerCase().trim().replace(/\s+/g, '-');
    const queryJob = {
      id: jobId,
      subcompany: job.subcompany,
      office: job.office,
      department: job.department,
      recruitingCategory: job.recruitingCategory,
      name: job.name,
      slug: slug,
      employmentType: job.employmentType,
      seniority: job.seniority,
      schedule: job.schedule,
      yearsOfExperience: job.yearsOfExperience,
      keywords: job.keywords,
      occupation: job.occupation,
      occupationCategory: job.occupationCategory,
      status: 'approved',
      created_at: new Date(),
      updated_at: new Date()
    };

    // Check if slug already exists
    const existing = await queryInterface.sequelize.query<{ id: string }>(
      `SELECT id FROM jobs WHERE slug = :slug LIMIT 1`,
      {
        replacements: { slug },
        type: QueryTypes.SELECT
      }
    );

    if (existing.length === 0) {
      queryJobs.push(queryJob);
    }
  }

  if (queryJobs.length > 0) {
    await queryInterface.bulkInsert('jobs', queryJobs);
  }
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('jobs', {});
}
