module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
      {
        tableName: 'categories',
        underscored: true,
      });  
    return Category;
  };