module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    post_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory,
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'category_id',
      otherKey: 'post_id',
      through: PostCategory,
    });
  }

  return PostCategory;
}
