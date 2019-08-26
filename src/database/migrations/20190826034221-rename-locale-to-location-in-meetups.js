module.exports = {
    up: queryInterface => {
        return queryInterface.renameColumn('meetups', 'locale', 'location');
    },

    down: queryInterface => {
        return queryInterface.renameColumn('meetups', 'location', 'locale');
    }
};
