module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      homeTeam: {
        type: Sequelize.INTEGER,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface, __Sequelize) => {
    await queryInterface.dropTable('matches');
  },
};
