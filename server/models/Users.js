module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 254] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [3, 254] },
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{10,12}$/,
      },
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 30] },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6, 255] },
    }
  }, {
    tableName: "users",
    timestamps: true,
  });

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Student, {
      foreignKey: "createdBy",
      as: "students"
    });

    User.hasMany(models.Course, {
      foreignKey: "createdBy",
      as: "courses"
    });
  }

  return User;
};
