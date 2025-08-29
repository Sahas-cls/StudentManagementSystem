module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: /^\d{10,12}$/ },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] },
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "courses", key: "courseId" },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "graduated"),
      allowNull: false,
      defaultValue: "active",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "userId" },
    },
  }, {
    tableName: "students",
    timestamps: true,
  });

  Student.associate = (models) => {
    Student.belongsTo(models.Course, { foreignKey: "courseId", as: "course" });
    Student.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
  };

  return Student;
};
