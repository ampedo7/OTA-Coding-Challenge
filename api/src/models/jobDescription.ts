import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany,
  PrimaryKey,
  ForeignKey
} from 'sequelize-typescript';
import Jobs from './jobs';

@Table({
  timestamps: true,
  tableName: 'job_description',
  modelName: 'Job_Description'
})
class Job_Description extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string;

  @ForeignKey(() => Jobs)
  @Column({
    type: DataType.UUID
  })
  declare jobs_id: string;

  @Column({
    type: DataType.STRING
  })
  declare name: string;

  @Column({
    type: DataType.TEXT
  })
  declare value: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

export default Job_Description;
