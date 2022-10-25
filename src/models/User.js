module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
    {
      tableName: 'users',
      underscored: true,
    });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'user_id',
    })
  }

  return User;
};