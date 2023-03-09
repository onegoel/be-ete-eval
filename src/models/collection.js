module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define('Collection', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contentTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
      
    // Collection.associate = (models) => {
    //     Collection.belongsTo(models.ContentType, {
    //         foreignKey: 'contentTypeId',
    //         onDelete: 'CASCADE'
    //     });
    // };
      
    return Collection;
};