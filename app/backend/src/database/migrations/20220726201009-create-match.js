module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
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
      awayTeamGols: {
        type: Sequelize.NUMBER,
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
