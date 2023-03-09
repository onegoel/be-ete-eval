module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('Entity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
      
    // Entity.associate = (models) => {
    //     Entity.belongsTo(models.Collection, {
    //         foreignKey: 'collectionId',
    //         onDelete: 'CASCADE'
    //     });
    //     Entity.belongsTo(models.Field, {
    //         foreignKey: 'fieldId',
    //         onDelete: 'CASCADE'
    //     });
    // };
      
    return Entity;
};
