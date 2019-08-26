module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'meetapp',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};
