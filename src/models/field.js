module.exports = (sequelize, DataTypes) => {
    const Field = sequelize.define('Field', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
  
    // Field.associate = (models) => {
    //     Field.belongsTo(models.ContentType, {
    //         foreignKey: 'contentTypeId',
    //         onDelete: 'CASCADE'
    //     });
    // };
  
    return Field;
};
  