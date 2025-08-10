import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('jobs', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      subcompany: {
        type: DataTypes.STRING,
        allowNull: true
      },
      office: {
        type: DataTypes.STRING,
        allowNull: true
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      },
      recruitingCategory: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true
      },
      employmentType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      seniority: {
        type: DataTypes.STRING,
        allowNull: true
      },
      schedule: {
        type: DataTypes.STRING,
        allowNull: true
      },
      yearsOfExperience: {
        type: DataTypes.STRING,
        allowNull: true
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: true
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      occupationCategory: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('jobs');
  }
};
