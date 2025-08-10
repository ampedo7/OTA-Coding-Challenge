import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany,
  PrimaryKey
} from 'sequelize-typescript';
import { toDefaultValue } from 'sequelize/types/utils';
import JobDescription from './jobDescription';

@Table({
  timestamps: true,
  tableName: 'jobs',
  modelName: 'Jobs'
})
class Jobs extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @Column({
    type: DataType.STRING
  })
  declare subcompany: string;

  @Column({
    type: DataType.STRING
  })
  declare office: string;

  @Column({
    type: DataType.STRING
  })
  declare department: string;

  @Column({
    type: DataType.STRING
  })
  declare recruitingCategory: string;

  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Column({
    type: DataType.STRING
  })
  declare slug: string;

  @Column({
    type: DataType.STRING
  })
  declare employmentType: string;

  @Column({
    type: DataType.STRING
  })
  declare seniority: string;

  @Column({
    type: DataType.STRING
  })
  declare schedule: string;

  @Column({
    type: DataType.STRING
  })
  declare yearsOfExperience: string;

  @Column({
    type: DataType.STRING
  })
  declare keywords: string;

  @Column({
    type: DataType.STRING
  })
  declare occupation: string;

  @Column({
    type: DataType.STRING
  })
  declare occupationCategory: string;

  @Column({
    type: DataType.STRING
  })
  declare status: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasMany(() => JobDescription)
  declare jobDescriptions: JobDescription[];

  @BeforeCreate
  static async generateSlug(instance: Jobs) {
    const count = await Jobs.count({
      where: {
        name: instance.name
      }
    });
    let suffix = '-';
    // if (count > 0) {
    //   suffix = `-${count + 1}`;
    // }
    instance.slug = instance.name.toLowerCase().trim().replace(/\s+/g, suffix);
  }
}

export default Jobs;
