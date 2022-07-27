module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER,
      },
      homeTeam: { type: Sequelize.STRING,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Matches');
  },
};
