import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import loginMiddleware from '../middlewares/loginMiddleware';
import LoginService from '../services/loginService';
import TeamsService from '../services/teamsService';
import MatchService from '../services/matchesService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes', () => {

  describe('/login', async () => {

    describe('Testando erro ao passar um body sem senha', async () => {
      let chaiHttpResponse: void;

      before(async () => {
        sinon
          .stub(loginMiddleware, 'validateLogin')
          .resolves({
            message: "All fields must be filled"
          })
      })

      after(() => {
        (loginMiddleware.validateLogin as sinon.SinonStub).restore();
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: ''})
        .then(function (res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          const body = JSON.parse(res.text);
          expect(body).to.deep.equal({message: "All fields must be filled"});
        })
        .catch(function (err) {
          throw err;
        })
      });
    })

    describe('Testando erro ao passar um body sem email', async () => {
      let chaiHttpResponse: void;

      before(async () => {
        sinon
          .stub(loginMiddleware, 'validateLogin')
          .resolves({
            message: "All fields must be filled"
          })
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: '123456'})
        .then(function (res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          const body = JSON.parse(res.text);
          expect(body).to.deep.equal({message: "All fields must be filled"});
        })
        .catch(function (err) {
          throw err;
        })
      });
    })

    describe('Testando erro ao passar uma senha incorreta', async () => {
      let chaiHttpResponse: void;
      const loginService = new LoginService();

      before(async () => {
        sinon
          .stub(loginService, 'authLogin')
          .resolves({
            message: "Incorrect email or password"
          })
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'user@user.com', password: '123456'})
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          const body = JSON.parse(res.text);
          expect(body).to.deep.equal({message: "Incorrect email or password"});
        })
        .catch(function (err) {
          throw err;
        })
      });
    })

    describe('Testando erro ao passar um email inválido', async () => {
      let chaiHttpResponse: void;
      const loginService = new LoginService();

      before(async () => {
        sinon
          .stub(loginService, 'authLogin')
          .resolves({
            message: "Incorrect email or password"
          })
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'user@user3.com', password: '123456'})
        .then(function (res) {
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          const body = JSON.parse(res.text);
          expect(body).to.deep.equal({message: "Incorrect email or password"});
        })
        .catch(function (err) {
          throw err;
        })
      });
    })

  })

  describe('/teams', async () => {

    describe('Testando get lista de times', async () => {
      let chaiHttpResponse: void;
      const teamsService = new TeamsService();

      before(async () => {
        sinon
          .stub(teamsService as any, 'getTeams')
          .resolves(
            [
              {
                  id: 1,
                  teamName: "Avaí/Kindermann"
              },
              {
                  id: 2,
                 teamName: "Bahia"
              },
              {
                  id: 3,
                 teamName: "Botafogo"
              },
              {
                  id: 4,
                 teamName: "Corinthians"
              },
              {
                  id: 5,
                 teamName: "Cruzeiro"
              },
              {
                  id: 6,
                 teamName: "Ferroviária"
              },
              {
                  id: 7,
                 teamName: "Flamengo"
              },
              {
                  id: 8,
                 teamName: "Grêmio"
              },
              {
                  id: 9,
                 teamName: "Internacional"
              },
              {
                  id: 10,
                 teamName: "Minas Brasília"
              },
              {
                  id: 11,
                 teamName: "Napoli-SC"
              },
              {
                  id: 12,
                 teamName: "Palmeiras"
              },
              {
                  id: 13,
                 teamName: "Real Brasília"
              },
              {
                id: 14,
                 teamName: "Santos"
              },
              {
                 id: 15,
                 teamName: "São José-SP"
              },
              {
                  id: 16,
                 teamName: "São Paulo"
              }
          ])
      })

      after(() => {
        (teamsService.getTeams as sinon.SinonStub).restore();
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(16);
        })
        .catch(function (err) {
          throw err;
        })
      });
    })

    describe('Testando get lista de times', async () => {
      let chaiHttpResponse: void;
      const teamsService = new TeamsService();

      before(async () => {
        sinon
          .stub(teamsService as any, 'getTeamById')
          .resolves({
            id: 5,
            teamName: "Cruzeiro"
        })
      })

      after(() => {
        (teamsService.getTeamById as sinon.SinonStub).restore();
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.teamName).to.equal('Cruzeiro');
        })
        .catch(function (err) {
          throw err;
        })
      });
    })
    
  })

  describe('/matches', async () => {

    describe('Testando get lista de partidas', async () => {
      let chaiHttpResponse: void;
      const matchesService = new MatchService();

      before(async () => {
        sinon
          .stub(matchesService as any, 'getMatches')
          .resolves()
      })

      after(() => {
        (matchesService.getMatches as sinon.SinonStub).restore();
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(16);
        })
        .catch(function (err) {
          throw err;
        })
      });
    })

    describe('Testando get lista de partidas em progresso', async () => {
      let chaiHttpResponse: void;
      const matchesService = new MatchService();

      before(async () => {
        sinon
          .stub(matchesService as any, 'getMatchesInProgress')
          .resolves([
            {
                id: 41,
                homeTeam: 16,
                homeTeamGoals: 2,
                awayTeam: 9,
                awayTeamGoals: 0,
                inProgress: true,
                teamHome: {
                    teamName: "São Paulo"
                },
                teamAway: {
                    teamName: "Internacional"
                }
            },
            {
                id: 42,
                homeTeam: 6,
                homeTeamGoals: 1,
                awayTeam: 1,
                awayTeamGoals: 0,
                inProgress: true,
                teamHome: {
                    teamName: "Ferroviária"
                },
                teamAway: {
                    teamName: "Avaí/Kindermann"
                }
            },
            {
                id: 43,
                homeTeam: 11,
                homeTeamGoals: 0,
                awayTeam: 10,
                awayTeamGoals: 0,
                inProgress: true,
                teamHome: {
                    teamName: "Napoli-SC"
                },
                teamAway: {
                    teamName: "Minas Brasília"
                }
            },
            {
                id: 44,
                homeTeam: 7,
                homeTeamGoals: 2,
                awayTeam: 15,
                awayTeamGoals: 2,
                inProgress: true,
                teamHome: {
                    teamName: "Flamengo"
                },
                teamAway: {
                    teamName: "São José-SP"
                }
            },
            {
                id: 45,
                homeTeam: 5,
                homeTeamGoals: 1,
                awayTeam: 3,
                awayTeamGoals: 1,
                inProgress: true,
                teamHome: {
                    teamName: "Cruzeiro"
                },
                teamAway: {
                    teamName: "Botafogo"
                }
            },
            {
                id: 46,
                homeTeam: 4,
                homeTeamGoals: 1,
                awayTeam: 12,
                awayTeamGoals: 1,
                inProgress: true,
                teamHome: {
                    teamName: "Corinthians"
                },
                teamAway: {
                    teamName: "Palmeiras"
                }
            },
            {
                id: 47,
                homeTeam: 8,
                homeTeamGoals: 1,
                awayTeam: 14,
                awayTeamGoals: 2,
                inProgress: true,
                teamHome: {
                    teamName: "Grêmio"
                },
                teamAway: {
                    teamName: "Santos"
                }
            },
            {
                id: 48,
                homeTeam: 13,
                homeTeamGoals: 1,
                awayTeam: 2,
                awayTeamGoals: 1,
                inProgress: true,
                teamHome: {
                    teamName: "Real Brasília"
                },
                teamAway: {
                    teamName: "Bahia"
                }
            }
        ])
      })

      after(() => {
        (matchesService.getMatchesInProgress as sinon.SinonStub).restore();
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(8);
          expect(res.body).to.be.an('array');
        })
        .catch(function (err) {
          throw err;
        })
      });
    })
    
  })

});
