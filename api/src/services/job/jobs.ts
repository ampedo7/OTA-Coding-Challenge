import Jobs from '../../models/jobs';
import JobDescription from '../../models/jobDescription';

export async function getAllJobsWithDescriptions() {
  return Jobs.findAll({
    where: { status: 'approved' },
    include: [{ model: JobDescription }],
    order: [['created_at', 'DESC']]
  });
}

export async function getJobsByStatus(status: string) {
  return await Jobs.findAll({
    where: { status },
    attributes: ['id', 'name', 'slug', 'status', 'created_at'],
    order: [['created_at', 'DESC']]
  });
}

export async function updateJobStatusById(id: string, status: string) {
  const job = await Jobs.findByPk(id);
  if (!job) {
    return null; // Not found
  }

  job.status = status;
  await job.save();

  return job; // returns updated job
}

export async function findJobBySlug(slug: string) {
  return Jobs.findOne({
    where: { slug },
    include: [{ model: JobDescription }]
  });
}

export async function createJobWithDescription(
  jobData: any,
  descriptions: any[]
) {
  const t = await Jobs.sequelize!.transaction();
  try {
    const job = await Jobs.create(jobData, { transaction: t });

    if (descriptions?.length) {
      await JobDescription.bulkCreate(
        descriptions.map((d) => ({ ...d, jobs_id: job.id })),
        { transaction: t }
      );
    }

    await t.commit();
    const { name, slug, createdAt } = job.get({ plain: true });

    return {
      name,
      jobDescriptions: descriptions
    };
  } catch (error) {
    // console.log(error);
    await t.rollback();
    throw {
      type: 'DB_ERROR',
      message: 'An unexpected database error occurred'
    };
  }

  // return await Jobs.sequelize!.transaction(async (t) => {
  //   const job = await Jobs.create(jobData, { transaction: t });
  //   if (descriptions?.length) {
  //     await JobDescription.bulkCreate(
  //       descriptions.map((d) => ({ ...d, jobs_idd: job.id })),
  //       { transaction: t }
  //     );
  //   }
  //   console.log(job);
  //   return job;
  // });
}
