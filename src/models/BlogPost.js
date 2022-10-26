module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated'
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    })
  }

  return BlogPost;
};