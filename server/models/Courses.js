module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 100] },
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 30] },
    },
    duration: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    totalSemesters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [0, 255] },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
  }, {
    tableName: "courses",
    timestamps: true,
  });

  Course.associate = (models) => {
    Course.hasMany(models.Student, { foreignKey: "courseId", as: "students" });
    Course.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
  };

  return Course;
};
