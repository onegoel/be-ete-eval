module.exports = (sequelize, DataTypes) => {
    const ContentType = sequelize.define('ContentType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});

    ContentType.associate = (models) => {
        ContentType.hasMany(models.Field, {
            foreignKey: 'contentTypeId',
            as: 'fields'
        });
        ContentType.hasMany(models.Collection, {
            foreignKey: 'contentTypeId',
            as: 'collections'
        });
    };

    return ContentType;
};