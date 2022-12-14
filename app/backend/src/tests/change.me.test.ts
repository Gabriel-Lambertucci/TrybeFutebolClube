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
import LeaderboardService from '../services/leaderboardService';

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

    describe('Testando erro ao passar um email inv??lido', async () => {
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
                  teamName: "Ava??/Kindermann"
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
                 teamName: "Ferrovi??ria"
              },
              {
                  id: 7,
                 teamName: "Flamengo"
              },
              {
                  id: 8,
                 teamName: "Gr??mio"
              },
              {
                  id: 9,
                 teamName: "Internacional"
              },
              {
                  id: 10,
                 teamName: "Minas Bras??lia"
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
                 teamName: "Real Bras??lia"
              },
              {
                id: 14,
                 teamName: "Santos"
              },
              {
                 id: 15,
                 teamName: "S??o Jos??-SP"
              },
              {
                  id: 16,
                 teamName: "S??o Paulo"
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
        .get('/matches')
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
                    teamName: "S??o Paulo"
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
                    teamName: "Ferrovi??ria"
                },
                teamAway: {
                    teamName: "Ava??/Kindermann"
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
                    teamName: "Minas Bras??lia"
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
                    teamName: "S??o Jos??-SP"
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
                    teamName: "Gr??mio"
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
                    teamName: "Real Bras??lia"
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

    describe('Testando get lista de partidas finalizadas', async () => {
      let chaiHttpResponse: void;
      const matchesService = new MatchService();

      before(async () => {
        sinon
          .stub(matchesService as any, 'getMatchesFinished')
          .resolves([
    {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "S??o Paulo"
        },
        "teamAway": {
            "teamName": "Gr??mio"
        }
    },
    {
        "id": 2,
        "homeTeam": 9,
        "homeTeamGoals": 1,
        "awayTeam": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Internacional"
        },
        "teamAway": {
            "teamName": "Santos"
        }
    },
    {
        "id": 3,
        "homeTeam": 4,
        "homeTeamGoals": 3,
        "awayTeam": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Corinthians"
        },
        "teamAway": {
            "teamName": "Napoli-SC"
        }
    },
    {
        "id": 4,
        "homeTeam": 3,
        "homeTeamGoals": 0,
        "awayTeam": 2,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Botafogo"
        },
        "teamAway": {
            "teamName": "Bahia"
        }
    },
    {
        "id": 5,
        "homeTeam": 7,
        "homeTeamGoals": 1,
        "awayTeam": 10,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Flamengo"
        },
        "teamAway": {
            "teamName": "Minas Bras??lia"
        }
    },
    {
        "id": 6,
        "homeTeam": 5,
        "homeTeamGoals": 1,
        "awayTeam": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Cruzeiro"
        },
        "teamAway": {
            "teamName": "Real Bras??lia"
        }
    },
    {
        "id": 7,
        "homeTeam": 12,
        "homeTeamGoals": 2,
        "awayTeam": 6,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Palmeiras"
        },
        "teamAway": {
            "teamName": "Ferrovi??ria"
        }
    },
    {
        "id": 8,
        "homeTeam": 15,
        "homeTeamGoals": 0,
        "awayTeam": 1,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "S??o Jos??-SP"
        },
        "teamAway": {
            "teamName": "Ava??/Kindermann"
        }
    },
    {
        "id": 9,
        "homeTeam": 1,
        "homeTeamGoals": 0,
        "awayTeam": 12,
        "awayTeamGoals": 3,
        "inProgress": false,
        "teamHome": {
            "teamName": "Ava??/Kindermann"
        },
        "teamAway": {
            "teamName": "Palmeiras"
        }
    },
    {
        "id": 10,
        "homeTeam": 2,
        "homeTeamGoals": 0,
        "awayTeam": 9,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Bahia"
        },
        "teamAway": {
            "teamName": "Internacional"
        }
    },
    {
        "id": 11,
        "homeTeam": 13,
        "homeTeamGoals": 1,
        "awayTeam": 3,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Real Bras??lia"
        },
        "teamAway": {
            "teamName": "Botafogo"
        }
    },
    {
        "id": 12,
        "homeTeam": 6,
        "homeTeamGoals": 0,
        "awayTeam": 4,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Ferrovi??ria"
        },
        "teamAway": {
            "teamName": "Corinthians"
        }
    },
    {
        "id": 13,
        "homeTeam": 8,
        "homeTeamGoals": 2,
        "awayTeam": 5,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Gr??mio"
        },
        "teamAway": {
            "teamName": "Cruzeiro"
        }
    },
    {
        "id": 14,
        "homeTeam": 14,
        "homeTeamGoals": 2,
        "awayTeam": 16,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Santos"
        },
        "teamAway": {
            "teamName": "S??o Paulo"
        }
    },
    {
        "id": 15,
        "homeTeam": 10,
        "homeTeamGoals": 0,
        "awayTeam": 15,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Minas Bras??lia"
        },
        "teamAway": {
            "teamName": "S??o Jos??-SP"
        }
    },
    {
        "id": 16,
        "homeTeam": 11,
        "homeTeamGoals": 0,
        "awayTeam": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Napoli-SC"
        },
        "teamAway": {
            "teamName": "Flamengo"
        }
    },
    {
        "id": 17,
        "homeTeam": 1,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 3,
        "inProgress": false,
        "teamHome": {
            "teamName": "Ava??/Kindermann"
        },
        "teamAway": {
            "teamName": "Gr??mio"
        }
    },
    {
        "id": 18,
        "homeTeam": 12,
        "homeTeamGoals": 4,
        "awayTeam": 5,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Palmeiras"
        },
        "teamAway": {
            "teamName": "Cruzeiro"
        }
    },
    {
        "id": 19,
        "homeTeam": 11,
        "homeTeamGoals": 2,
        "awayTeam": 2,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Napoli-SC"
        },
        "teamAway": {
            "teamName": "Bahia"
        }
    },
    {
        "id": 20,
        "homeTeam": 7,
        "homeTeamGoals": 0,
        "awayTeam": 9,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Flamengo"
        },
        "teamAway": {
            "teamName": "Internacional"
        }
    },
    {
        "id": 21,
        "homeTeam": 6,
        "homeTeamGoals": 3,
        "awayTeam": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Ferrovi??ria"
        },
        "teamAway": {
            "teamName": "Real Bras??lia"
        }
    },
    {
        "id": 22,
        "homeTeam": 4,
        "homeTeamGoals": 3,
        "awayTeam": 3,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Corinthians"
        },
        "teamAway": {
            "teamName": "Botafogo"
        }
    },
    {
        "id": 23,
        "homeTeam": 15,
        "homeTeamGoals": 2,
        "awayTeam": 16,
        "awayTeamGoals": 3,
        "inProgress": false,
        "teamHome": {
            "teamName": "S??o Jos??-SP"
        },
        "teamAway": {
            "teamName": "S??o Paulo"
        }
    },
    {
        "id": 24,
        "homeTeam": 10,
        "homeTeamGoals": 2,
        "awayTeam": 14,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Minas Bras??lia"
        },
        "teamAway": {
            "teamName": "Santos"
        }
    },
    {
        "id": 25,
        "homeTeam": 2,
        "homeTeamGoals": 0,
        "awayTeam": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Bahia"
        },
        "teamAway": {
            "teamName": "Ferrovi??ria"
        }
    },
    {
        "id": 26,
        "homeTeam": 13,
        "homeTeamGoals": 1,
        "awayTeam": 1,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Real Bras??lia"
        },
        "teamAway": {
            "teamName": "Ava??/Kindermann"
        }
    },
    {
        "id": 27,
        "homeTeam": 5,
        "homeTeamGoals": 1,
        "awayTeam": 15,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Cruzeiro"
        },
        "teamAway": {
            "teamName": "S??o Jos??-SP"
        }
    },
    {
        "id": 28,
        "homeTeam": 16,
        "homeTeamGoals": 3,
        "awayTeam": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "S??o Paulo"
        },
        "teamAway": {
            "teamName": "Flamengo"
        }
    },
    {
        "id": 29,
        "homeTeam": 9,
        "homeTeamGoals": 0,
        "awayTeam": 4,
        "awayTeamGoals": 4,
        "inProgress": false,
        "teamHome": {
            "teamName": "Internacional"
        },
        "teamAway": {
            "teamName": "Corinthians"
        }
    },
    {
        "id": 30,
        "homeTeam": 3,
        "homeTeamGoals": 0,
        "awayTeam": 12,
        "awayTeamGoals": 4,
        "inProgress": false,
        "teamHome": {
            "teamName": "Botafogo"
        },
        "teamAway": {
            "teamName": "Palmeiras"
        }
    },
    {
        "id": 31,
        "homeTeam": 8,
        "homeTeamGoals": 2,
        "awayTeam": 10,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Gr??mio"
        },
        "teamAway": {
            "teamName": "Minas Bras??lia"
        }
    },
    {
        "id": 32,
        "homeTeam": 14,
        "homeTeamGoals": 5,
        "awayTeam": 11,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Santos"
        },
        "teamAway": {
            "teamName": "Napoli-SC"
        }
    },
    {
        "id": 33,
        "homeTeam": 1,
        "homeTeamGoals": 1,
        "awayTeam": 16,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Ava??/Kindermann"
        },
        "teamAway": {
            "teamName": "S??o Paulo"
        }
    },
    {
        "id": 34,
        "homeTeam": 9,
        "homeTeamGoals": 3,
        "awayTeam": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Internacional"
        },
        "teamAway": {
            "teamName": "Ferrovi??ria"
        }
    },
    {
        "id": 35,
        "homeTeam": 10,
        "homeTeamGoals": 1,
        "awayTeam": 5,
        "awayTeamGoals": 3,
        "inProgress": false,
        "teamHome": {
            "teamName": "Minas Bras??lia"
        },
        "teamAway": {
            "teamName": "Cruzeiro"
        }
    },
    {
        "id": 36,
        "homeTeam": 2,
        "homeTeamGoals": 0,
        "awayTeam": 7,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Bahia"
        },
        "teamAway": {
            "teamName": "Flamengo"
        }
    },
    {
        "id": 37,
        "homeTeam": 15,
        "homeTeamGoals": 0,
        "awayTeam": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "S??o Jos??-SP"
        },
        "teamAway": {
            "teamName": "Real Bras??lia"
        }
    },
    {
        "id": 38,
        "homeTeam": 14,
        "homeTeamGoals": 2,
        "awayTeam": 4,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Santos"
        },
        "teamAway": {
            "teamName": "Corinthians"
        }
    },
    {
        "id": 39,
        "homeTeam": 3,
        "homeTeamGoals": 2,
        "awayTeam": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Botafogo"
        },
        "teamAway": {
            "teamName": "Napoli-SC"
        }
    },
    {
        "id": 40,
        "homeTeam": 12,
        "homeTeamGoals": 4,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Palmeiras"
        },
        "teamAway": {
            "teamName": "Gr??mio"
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
        .get('/matches?inProgress=false')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(8);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.equal([
            {
                "id": 1,
                "homeTeam": 16,
                "homeTeamGoals": 1,
                "awayTeam": 8,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "S??o Paulo"
                },
                "teamAway": {
                    "teamName": "Gr??mio"
                }
            },
            {
                "id": 2,
                "homeTeam": 9,
                "homeTeamGoals": 1,
                "awayTeam": 14,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Internacional"
                },
                "teamAway": {
                    "teamName": "Santos"
                }
            },
            {
                "id": 3,
                "homeTeam": 4,
                "homeTeamGoals": 3,
                "awayTeam": 11,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Corinthians"
                },
                "teamAway": {
                    "teamName": "Napoli-SC"
                }
            },
            {
                "id": 4,
                "homeTeam": 3,
                "homeTeamGoals": 0,
                "awayTeam": 2,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Botafogo"
                },
                "teamAway": {
                    "teamName": "Bahia"
                }
            },
            {
                "id": 5,
                "homeTeam": 7,
                "homeTeamGoals": 1,
                "awayTeam": 10,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Flamengo"
                },
                "teamAway": {
                    "teamName": "Minas Bras??lia"
                }
            },
            {
                "id": 6,
                "homeTeam": 5,
                "homeTeamGoals": 1,
                "awayTeam": 13,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Cruzeiro"
                },
                "teamAway": {
                    "teamName": "Real Bras??lia"
                }
            },
            {
                "id": 7,
                "homeTeam": 12,
                "homeTeamGoals": 2,
                "awayTeam": 6,
                "awayTeamGoals": 2,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Palmeiras"
                },
                "teamAway": {
                    "teamName": "Ferrovi??ria"
                }
            },
            {
                "id": 8,
                "homeTeam": 15,
                "homeTeamGoals": 0,
                "awayTeam": 1,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "S??o Jos??-SP"
                },
                "teamAway": {
                    "teamName": "Ava??/Kindermann"
                }
            },
            {
                "id": 9,
                "homeTeam": 1,
                "homeTeamGoals": 0,
                "awayTeam": 12,
                "awayTeamGoals": 3,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Ava??/Kindermann"
                },
                "teamAway": {
                    "teamName": "Palmeiras"
                }
            },
            {
                "id": 10,
                "homeTeam": 2,
                "homeTeamGoals": 0,
                "awayTeam": 9,
                "awayTeamGoals": 2,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Bahia"
                },
                "teamAway": {
                    "teamName": "Internacional"
                }
            },
            {
                "id": 11,
                "homeTeam": 13,
                "homeTeamGoals": 1,
                "awayTeam": 3,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Real Bras??lia"
                },
                "teamAway": {
                    "teamName": "Botafogo"
                }
            },
            {
                "id": 12,
                "homeTeam": 6,
                "homeTeamGoals": 0,
                "awayTeam": 4,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Ferrovi??ria"
                },
                "teamAway": {
                    "teamName": "Corinthians"
                }
            },
            {
                "id": 13,
                "homeTeam": 8,
                "homeTeamGoals": 2,
                "awayTeam": 5,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Gr??mio"
                },
                "teamAway": {
                    "teamName": "Cruzeiro"
                }
            },
            {
                "id": 14,
                "homeTeam": 14,
                "homeTeamGoals": 2,
                "awayTeam": 16,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Santos"
                },
                "teamAway": {
                    "teamName": "S??o Paulo"
                }
            },
            {
                "id": 15,
                "homeTeam": 10,
                "homeTeamGoals": 0,
                "awayTeam": 15,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Minas Bras??lia"
                },
                "teamAway": {
                    "teamName": "S??o Jos??-SP"
                }
            },
            {
                "id": 16,
                "homeTeam": 11,
                "homeTeamGoals": 0,
                "awayTeam": 7,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Napoli-SC"
                },
                "teamAway": {
                    "teamName": "Flamengo"
                }
            },
            {
                "id": 17,
                "homeTeam": 1,
                "homeTeamGoals": 2,
                "awayTeam": 8,
                "awayTeamGoals": 3,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Ava??/Kindermann"
                },
                "teamAway": {
                    "teamName": "Gr??mio"
                }
            },
            {
                "id": 18,
                "homeTeam": 12,
                "homeTeamGoals": 4,
                "awayTeam": 5,
                "awayTeamGoals": 2,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Palmeiras"
                },
                "teamAway": {
                    "teamName": "Cruzeiro"
                }
            },
            {
                "id": 19,
                "homeTeam": 11,
                "homeTeamGoals": 2,
                "awayTeam": 2,
                "awayTeamGoals": 2,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Napoli-SC"
                },
                "teamAway": {
                    "teamName": "Bahia"
                }
            },
            {
                "id": 20,
                "homeTeam": 7,
                "homeTeamGoals": 0,
                "awayTeam": 9,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Flamengo"
                },
                "teamAway": {
                    "teamName": "Internacional"
                }
            },
            {
                "id": 21,
                "homeTeam": 6,
                "homeTeamGoals": 3,
                "awayTeam": 13,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Ferrovi??ria"
                },
                "teamAway": {
                    "teamName": "Real Bras??lia"
                }
            },
            {
                "id": 22,
                "homeTeam": 4,
                "homeTeamGoals": 3,
                "awayTeam": 3,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Corinthians"
                },
                "teamAway": {
                    "teamName": "Botafogo"
                }
            },
            {
                "id": 23,
                "homeTeam": 15,
                "homeTeamGoals": 2,
                "awayTeam": 16,
                "awayTeamGoals": 3,
                "inProgress": false,
                "teamHome": {
                    "teamName": "S??o Jos??-SP"
                },
                "teamAway": {
                    "teamName": "S??o Paulo"
                }
            },
            {
                "id": 24,
                "homeTeam": 10,
                "homeTeamGoals": 2,
                "awayTeam": 14,
                "awayTeamGoals": 2,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Minas Bras??lia"
                },
                "teamAway": {
                    "teamName": "Santos"
                }
            },
            {
                "id": 25,
                "homeTeam": 2,
                "homeTeamGoals": 0,
                "awayTeam": 6,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Bahia"
                },
                "teamAway": {
                    "teamName": "Ferrovi??ria"
                }
            },
            {
                "id": 26,
                "homeTeam": 13,
                "homeTeamGoals": 1,
                "awayTeam": 1,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Real Bras??lia"
                },
                "teamAway": {
                    "teamName": "Ava??/Kindermann"
                }
            },
            {
                "id": 27,
                "homeTeam": 5,
                "homeTeamGoals": 1,
                "awayTeam": 15,
                "awayTeamGoals": 2,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Cruzeiro"
                },
                "teamAway": {
                    "teamName": "S??o Jos??-SP"
                }
            },
            {
                "id": 28,
                "homeTeam": 16,
                "homeTeamGoals": 3,
                "awayTeam": 7,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "S??o Paulo"
                },
                "teamAway": {
                    "teamName": "Flamengo"
                }
            },
            {
                "id": 29,
                "homeTeam": 9,
                "homeTeamGoals": 0,
                "awayTeam": 4,
                "awayTeamGoals": 4,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Internacional"
                },
                "teamAway": {
                    "teamName": "Corinthians"
                }
            },
            {
                "id": 30,
                "homeTeam": 3,
                "homeTeamGoals": 0,
                "awayTeam": 12,
                "awayTeamGoals": 4,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Botafogo"
                },
                "teamAway": {
                    "teamName": "Palmeiras"
                }
            },
            {
                "id": 31,
                "homeTeam": 8,
                "homeTeamGoals": 2,
                "awayTeam": 10,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Gr??mio"
                },
                "teamAway": {
                    "teamName": "Minas Bras??lia"
                }
            },
            {
                "id": 32,
                "homeTeam": 14,
                "homeTeamGoals": 5,
                "awayTeam": 11,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Santos"
                },
                "teamAway": {
                    "teamName": "Napoli-SC"
                }
            },
            {
                "id": 33,
                "homeTeam": 1,
                "homeTeamGoals": 1,
                "awayTeam": 16,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Ava??/Kindermann"
                },
                "teamAway": {
                    "teamName": "S??o Paulo"
                }
            },
            {
                "id": 34,
                "homeTeam": 9,
                "homeTeamGoals": 3,
                "awayTeam": 6,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Internacional"
                },
                "teamAway": {
                    "teamName": "Ferrovi??ria"
                }
            },
            {
                "id": 35,
                "homeTeam": 10,
                "homeTeamGoals": 1,
                "awayTeam": 5,
                "awayTeamGoals": 3,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Minas Bras??lia"
                },
                "teamAway": {
                    "teamName": "Cruzeiro"
                }
            },
            {
                "id": 36,
                "homeTeam": 2,
                "homeTeamGoals": 0,
                "awayTeam": 7,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Bahia"
                },
                "teamAway": {
                    "teamName": "Flamengo"
                }
            },
            {
                "id": 37,
                "homeTeam": 15,
                "homeTeamGoals": 0,
                "awayTeam": 13,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "S??o Jos??-SP"
                },
                "teamAway": {
                    "teamName": "Real Bras??lia"
                }
            },
            {
                "id": 38,
                "homeTeam": 14,
                "homeTeamGoals": 2,
                "awayTeam": 4,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Santos"
                },
                "teamAway": {
                    "teamName": "Corinthians"
                }
            },
            {
                "id": 39,
                "homeTeam": 3,
                "homeTeamGoals": 2,
                "awayTeam": 11,
                "awayTeamGoals": 0,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Botafogo"
                },
                "teamAway": {
                    "teamName": "Napoli-SC"
                }
            },
            {
                "id": 40,
                "homeTeam": 12,
                "homeTeamGoals": 4,
                "awayTeam": 8,
                "awayTeamGoals": 1,
                "inProgress": false,
                "teamHome": {
                    "teamName": "Palmeiras"
                },
                "teamAway": {
                    "teamName": "Gr??mio"
                }
            }
        ])
        })
        .catch(function (err) {
          throw err;
        })
      });
    })
    
  })

  describe('/leaderboard', async () => {

    
    describe('Testando get leaderboard', async () => {
      let chaiHttpResponse: void;
      const leaderboardService = new LeaderboardService();

      before(async () => {
        sinon
          .stub(leaderboardService as any, 'getLeaderboard')
          .resolves([
            {
                name: "Palmeiras",
                totalPoints: 13,
                totalGames: 5,
                totalVictories: 4,
                totalDraws: 1,
                totalLosses: 0,
                goalsFavor: 17,
                goalsOwn: 5,
                goalsBalance: 12,
                efficiency: 86.67
            },
            {
                name: "Corinthians",
                totalPoints: 12,
                totalGames: 5,
                totalVictories: 4,
                totalDraws: 0,
                totalLosses: 1,
                goalsFavor: 12,
                goalsOwn: 3,
                goalsBalance: 9,
                efficiency: 80
            },
            {
                name: "Santos",
                totalPoints: 11,
                totalGames: 5,
                totalVictories: 3,
                totalDraws: 2,
                totalLosses: 0,
                goalsFavor: 12,
                goalsOwn: 6,
                goalsBalance: 6,
                efficiency: 73.33
            },
            {
                name: "Gr??mio",
                totalPoints: 10,
                totalGames: 5,
                totalVictories: 3,
                totalDraws: 1,
                totalLosses: 1,
                goalsFavor: 9,
                goalsOwn: 8,
                goalsBalance: 1,
                efficiency: 66.67
            },
            {
                name: "Internacional",
                totalPoints: 10,
                totalGames: 5,
                totalVictories: 3,
                totalDraws: 1,
                totalLosses: 1,
                goalsFavor: 7,
                goalsOwn: 6,
                goalsBalance: 1,
                efficiency: 66.67
            },
            {
                name: "Real Bras??lia",
                totalPoints: 10,
                totalGames: 5,
                totalVictories: 3,
                totalDraws: 1,
                totalLosses: 1,
                goalsFavor: 5,
                goalsOwn: 4,
                goalsBalance: 1,
                efficiency: 66.67
            },
            {
                name: "S??o Paulo",
                totalPoints: 8,
                totalGames: 5,
                totalVictories: 2,
                totalDraws: 2,
                totalLosses: 1,
                goalsFavor: 9,
                goalsOwn: 6,
                goalsBalance: 3,
                efficiency: 53.33
            },
            {
                name: "Ferrovi??ria",
                totalPoints: 7,
                totalGames: 5,
                totalVictories: 2,
                totalDraws: 1,
                totalLosses: 2,
                goalsFavor: 7,
                goalsOwn: 7,
                goalsBalance: 0,
                efficiency: 46.67
            },
            {
                name: "S??o Jos??-SP",
                totalPoints: 6,
                totalGames: 5,
                totalVictories: 2,
                totalDraws: 0,
                totalLosses: 3,
                goalsFavor: 5,
                goalsOwn: 6,
                goalsBalance: -1,
                efficiency: 40
            },
            {
                name: "Flamengo",
                totalPoints: 5,
                totalGames: 5,
                totalVictories: 1,
                totalDraws: 2,
                totalLosses: 2,
                goalsFavor: 2,
                goalsOwn: 5,
                goalsBalance: -3,
                efficiency: 33.33
            },
            {
                name: "Cruzeiro",
                totalPoints: 4,
                totalGames: 5,
                totalVictories: 1,
                totalDraws: 1,
                totalLosses: 3,
                goalsFavor: 8,
                goalsOwn: 10,
                goalsBalance: -2,
                efficiency: 26.67
            },
            {
                name: "Ava??/Kindermann",
                totalPoints: 4,
                totalGames: 5,
                totalVictories: 1,
                totalDraws: 1,
                totalLosses: 3,
                goalsFavor: 4,
                goalsOwn: 8,
                goalsBalance: -4,
                efficiency: 26.67
            },
            {
                name: "Botafogo",
                totalPoints: 4,
                totalGames: 5,
                totalVictories: 1,
                totalDraws: 1,
                totalLosses: 3,
                goalsFavor: 3,
                goalsOwn: 8,
                goalsBalance: -5,
                efficiency: 26.67
            },
            {
                name: "Bahia",
                totalPoints: 2,
                totalGames: 5,
                totalVictories: 0,
                totalDraws: 2,
                totalLosses: 3,
                goalsFavor: 2,
                goalsOwn: 6,
                goalsBalance: -4,
                efficiency: 13.33
            },
            {
                name: "Minas Bras??lia",
                totalPoints: 2,
                totalGames: 5,
                totalVictories: 0,
                totalDraws: 2,
                totalLosses: 3,
                goalsFavor: 4,
                goalsOwn: 9,
                goalsBalance: -5,
                efficiency: 13.33
            },
            {
                name: "Napoli-SC",
                totalPoints: 2,
                totalGames: 5,
                totalVictories: 0,
                totalDraws: 2,
                totalLosses: 3,
                goalsFavor: 3,
                goalsOwn: 12,
                goalsBalance: -9,
                efficiency: 13.33
            }
        ])
      })

      after(() => {
        (leaderboardService.getLeaderboard as sinon.SinonStub).restore();
      })

      it('teste', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(16);
          expect(res.body).to.be.an('array');
        })
        .catch(function (err) {
          throw err;
        })
      });
    })
    
  })

  describe('Testando get home leaderboard', async () => {
    let chaiHttpResponse: void;
    const leaderboardService = new LeaderboardService();

    before(async () => {
      sinon
        .stub(leaderboardService as any, 'getHomeLeaderboard')
        .resolves([
          {
              name: "Santos",
              totalPoints: 9,
              totalGames: 3,
              totalVictories: 3,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 9,
              goalsOwn: 3,
              goalsBalance: 6,
              efficiency: 100
          },
          {
              name: "Palmeiras",
              totalPoints: 7,
              totalGames: 3,
              totalVictories: 2,
              totalDraws: 1,
              totalLosses: 0,
              goalsFavor: 10,
              goalsOwn: 5,
              goalsBalance: 5,
              efficiency: 77.78
          },
          {
              name: "Corinthians",
              totalPoints: 6,
              totalGames: 2,
              totalVictories: 2,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 6,
              goalsOwn: 1,
              goalsBalance: 5,
              efficiency: 100
          },
          {
              name: "Gr??mio",
              totalPoints: 6,
              totalGames: 2,
              totalVictories: 2,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 4,
              goalsOwn: 1,
              goalsBalance: 3,
              efficiency: 100
          },
          {
              name: "Real Bras??lia",
              totalPoints: 6,
              totalGames: 2,
              totalVictories: 2,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 2,
              goalsOwn: 0,
              goalsBalance: 2,
              efficiency: 100
          },
          {
              name: "S??o Paulo",
              totalPoints: 4,
              totalGames: 2,
              totalVictories: 1,
              totalDraws: 1,
              totalLosses: 0,
              goalsFavor: 4,
              goalsOwn: 1,
              goalsBalance: 3,
              efficiency: 66.67
          },
          {
              name: "Internacional",
              totalPoints: 4,
              totalGames: 3,
              totalVictories: 1,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 4,
              goalsOwn: 6,
              goalsBalance: -2,
              efficiency: 44.44
          },
          {
              name: "Botafogo",
              totalPoints: 4,
              totalGames: 3,
              totalVictories: 1,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 2,
              goalsOwn: 4,
              goalsBalance: -2,
              efficiency: 44.44
          },
          {
              name: "Ferrovi??ria",
              totalPoints: 3,
              totalGames: 2,
              totalVictories: 1,
              totalDraws: 0,
              totalLosses: 1,
              goalsFavor: 3,
              goalsOwn: 2,
              goalsBalance: 1,
              efficiency: 50
          },
          {
              name: "Napoli-SC",
              totalPoints: 2,
              totalGames: 2,
              totalVictories: 0,
              totalDraws: 2,
              totalLosses: 0,
              goalsFavor: 2,
              goalsOwn: 2,
              goalsBalance: 0,
              efficiency: 33.33
          },
          {
              name: "Cruzeiro",
              totalPoints: 1,
              totalGames: 2,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 2,
              goalsOwn: 3,
              goalsBalance: -1,
              efficiency: 16.67
          },
          {
              name: "Flamengo",
              totalPoints: 1,
              totalGames: 2,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 1,
              goalsOwn: 2,
              goalsBalance: -1,
              efficiency: 16.67
          },
          {
              name: "Minas Bras??lia",
              totalPoints: 1,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 2,
              goalsFavor: 3,
              goalsOwn: 6,
              goalsBalance: -3,
              efficiency: 11.11
          },
          {
              name: "Ava??/Kindermann",
              totalPoints: 1,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 2,
              goalsFavor: 3,
              goalsOwn: 7,
              goalsBalance: -4,
              efficiency: 11.11
          },
          {
              name: "S??o Jos??-SP",
              totalPoints: 0,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 0,
              totalLosses: 3,
              goalsFavor: 2,
              goalsOwn: 5,
              goalsBalance: -3,
              efficiency: 0
          },
          {
              name: "Bahia",
              totalPoints: 0,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 0,
              totalLosses: 3,
              goalsFavor: 0,
              goalsOwn: 4,
              goalsBalance: -4,
              efficiency: 0
          }
      ])
    })

    after(() => {
      (leaderboardService.getHomeLeaderboard as sinon.SinonStub).restore();
    })

    it('teste', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.equal(16);
        expect(res.body).to.deep.equal([
          {
              name: "Santos",
              totalPoints: 9,
              totalGames: 3,
              totalVictories: 3,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 9,
              goalsOwn: 3,
              goalsBalance: 6,
              efficiency: 100
          },
          {
              name: "Palmeiras",
              totalPoints: 7,
              totalGames: 3,
              totalVictories: 2,
              totalDraws: 1,
              totalLosses: 0,
              goalsFavor: 10,
              goalsOwn: 5,
              goalsBalance: 5,
              efficiency: 77.78
          },
          {
              name: "Corinthians",
              totalPoints: 6,
              totalGames: 2,
              totalVictories: 2,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 6,
              goalsOwn: 1,
              goalsBalance: 5,
              efficiency: 100
          },
          {
              name: "Gr??mio",
              totalPoints: 6,
              totalGames: 2,
              totalVictories: 2,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 4,
              goalsOwn: 1,
              goalsBalance: 3,
              efficiency: 100
          },
          {
              name: "Real Bras??lia",
              totalPoints: 6,
              totalGames: 2,
              totalVictories: 2,
              totalDraws: 0,
              totalLosses: 0,
              goalsFavor: 2,
              goalsOwn: 0,
              goalsBalance: 2,
              efficiency: 100
          },
          {
              name: "S??o Paulo",
              totalPoints: 4,
              totalGames: 2,
              totalVictories: 1,
              totalDraws: 1,
              totalLosses: 0,
              goalsFavor: 4,
              goalsOwn: 1,
              goalsBalance: 3,
              efficiency: 66.67
          },
          {
              name: "Internacional",
              totalPoints: 4,
              totalGames: 3,
              totalVictories: 1,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 4,
              goalsOwn: 6,
              goalsBalance: -2,
              efficiency: 44.44
          },
          {
              name: "Botafogo",
              totalPoints: 4,
              totalGames: 3,
              totalVictories: 1,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 2,
              goalsOwn: 4,
              goalsBalance: -2,
              efficiency: 44.44
          },
          {
              name: "Ferrovi??ria",
              totalPoints: 3,
              totalGames: 2,
              totalVictories: 1,
              totalDraws: 0,
              totalLosses: 1,
              goalsFavor: 3,
              goalsOwn: 2,
              goalsBalance: 1,
              efficiency: 50
          },
          {
              name: "Napoli-SC",
              totalPoints: 2,
              totalGames: 2,
              totalVictories: 0,
              totalDraws: 2,
              totalLosses: 0,
              goalsFavor: 2,
              goalsOwn: 2,
              goalsBalance: 0,
              efficiency: 33.33
          },
          {
              name: "Cruzeiro",
              totalPoints: 1,
              totalGames: 2,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 2,
              goalsOwn: 3,
              goalsBalance: -1,
              efficiency: 16.67
          },
          {
              name: "Flamengo",
              totalPoints: 1,
              totalGames: 2,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 1,
              goalsFavor: 1,
              goalsOwn: 2,
              goalsBalance: -1,
              efficiency: 16.67
          },
          {
              name: "Minas Bras??lia",
              totalPoints: 1,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 2,
              goalsFavor: 3,
              goalsOwn: 6,
              goalsBalance: -3,
              efficiency: 11.11
          },
          {
              name: "Ava??/Kindermann",
              totalPoints: 1,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 1,
              totalLosses: 2,
              goalsFavor: 3,
              goalsOwn: 7,
              goalsBalance: -4,
              efficiency: 11.11
          },
          {
              name: "S??o Jos??-SP",
              totalPoints: 0,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 0,
              totalLosses: 3,
              goalsFavor: 2,
              goalsOwn: 5,
              goalsBalance: -3,
              efficiency: 0
          },
          {
              name: "Bahia",
              totalPoints: 0,
              totalGames: 3,
              totalVictories: 0,
              totalDraws: 0,
              totalLosses: 3,
              goalsFavor: 0,
              goalsOwn: 4,
              goalsBalance: -4,
              efficiency: 0
          }
      ]);
      })
      .catch(function (err) {
        throw err;
      })
    });
  })

  describe('Testando get away leaderboard', async () => {
    let chaiHttpResponse: void;
    const leaderboardService = new LeaderboardService();

    before(async () => {
      sinon
        .stub(leaderboardService as any, 'getAwayLeaderboard')
        .resolves([
          {
              "name": "Palmeiras",
              "totalPoints": 6,
              "totalGames": 2,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 0,
              "goalsFavor": 7,
              "goalsOwn": 0,
              "goalsBalance": 7,
              "efficiency": 100
          },
          {
              "name": "Corinthians",
              "totalPoints": 6,
              "totalGames": 3,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 1,
              "goalsFavor": 6,
              "goalsOwn": 2,
              "goalsBalance": 4,
              "efficiency": 66.67
          },
          {
              "name": "Internacional",
              "totalPoints": 6,
              "totalGames": 2,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 0,
              "goalsFavor": 3,
              "goalsOwn": 0,
              "goalsBalance": 3,
              "efficiency": 100
          },
          {
              "name": "S??o Jos??-SP",
              "totalPoints": 6,
              "totalGames": 2,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 0,
              "goalsFavor": 3,
              "goalsOwn": 1,
              "goalsBalance": 2,
              "efficiency": 100
          },
          {
              "name": "S??o Paulo",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 5,
              "goalsOwn": 5,
              "goalsBalance": 0,
              "efficiency": 44.44
          },
          {
              "name": "Ferrovi??ria",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 4,
              "goalsOwn": 5,
              "goalsBalance": -1,
              "efficiency": 44.44
          },
          {
              "name": "Real Bras??lia",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 3,
              "goalsOwn": 4,
              "goalsBalance": -1,
              "efficiency": 44.44
          },
          {
              "name": "Gr??mio",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 5,
              "goalsOwn": 7,
              "goalsBalance": -2,
              "efficiency": 44.44
          },
          {
              "name": "Flamengo",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 1,
              "goalsOwn": 3,
              "goalsBalance": -2,
              "efficiency": 44.44
          },
          {
              "name": "Ava??/Kindermann",
              "totalPoints": 3,
              "totalGames": 2,
              "totalVictories": 1,
              "totalDraws": 0,
              "totalLosses": 1,
              "goalsFavor": 1,
              "goalsOwn": 1,
              "goalsBalance": 0,
              "efficiency": 50
          },
          {
              "name": "Cruzeiro",
              "totalPoints": 3,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 0,
              "totalLosses": 2,
              "goalsFavor": 6,
              "goalsOwn": 7,
              "goalsBalance": -1,
              "efficiency": 33.33
          },
          {
              "name": "Santos",
              "totalPoints": 2,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 2,
              "totalLosses": 0,
              "goalsFavor": 3,
              "goalsOwn": 3,
              "goalsBalance": 0,
              "efficiency": 33.33
          },
          {
              "name": "Bahia",
              "totalPoints": 2,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 2,
              "totalLosses": 0,
              "goalsFavor": 2,
              "goalsOwn": 2,
              "goalsBalance": 0,
              "efficiency": 33.33
          },
          {
              "name": "Minas Bras??lia",
              "totalPoints": 1,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 1,
              "goalsOwn": 3,
              "goalsBalance": -2,
              "efficiency": 16.67
          },
          {
              "name": "Botafogo",
              "totalPoints": 0,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 0,
              "totalLosses": 2,
              "goalsFavor": 1,
              "goalsOwn": 4,
              "goalsBalance": -3,
              "efficiency": 0
          },
          {
              "name": "Napoli-SC",
              "totalPoints": 0,
              "totalGames": 3,
              "totalVictories": 0,
              "totalDraws": 0,
              "totalLosses": 3,
              "goalsFavor": 1,
              "goalsOwn": 10,
              "goalsBalance": -9,
              "efficiency": 0
          }
      ])
    })

    after(() => {
      (leaderboardService.getAwayLeaderboard as sinon.SinonStub).restore();
    })

    it('teste', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.equal(16);
        expect(res.body).to.deep.equal([
          {
              "name": "Palmeiras",
              "totalPoints": 6,
              "totalGames": 2,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 0,
              "goalsFavor": 7,
              "goalsOwn": 0,
              "goalsBalance": 7,
              "efficiency": 100
          },
          {
              "name": "Corinthians",
              "totalPoints": 6,
              "totalGames": 3,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 1,
              "goalsFavor": 6,
              "goalsOwn": 2,
              "goalsBalance": 4,
              "efficiency": 66.67
          },
          {
              "name": "Internacional",
              "totalPoints": 6,
              "totalGames": 2,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 0,
              "goalsFavor": 3,
              "goalsOwn": 0,
              "goalsBalance": 3,
              "efficiency": 100
          },
          {
              "name": "S??o Jos??-SP",
              "totalPoints": 6,
              "totalGames": 2,
              "totalVictories": 2,
              "totalDraws": 0,
              "totalLosses": 0,
              "goalsFavor": 3,
              "goalsOwn": 1,
              "goalsBalance": 2,
              "efficiency": 100
          },
          {
              "name": "S??o Paulo",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 5,
              "goalsOwn": 5,
              "goalsBalance": 0,
              "efficiency": 44.44
          },
          {
              "name": "Ferrovi??ria",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 4,
              "goalsOwn": 5,
              "goalsBalance": -1,
              "efficiency": 44.44
          },
          {
              "name": "Real Bras??lia",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 3,
              "goalsOwn": 4,
              "goalsBalance": -1,
              "efficiency": 44.44
          },
          {
              "name": "Gr??mio",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 5,
              "goalsOwn": 7,
              "goalsBalance": -2,
              "efficiency": 44.44
          },
          {
              "name": "Flamengo",
              "totalPoints": 4,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 1,
              "goalsOwn": 3,
              "goalsBalance": -2,
              "efficiency": 44.44
          },
          {
              "name": "Ava??/Kindermann",
              "totalPoints": 3,
              "totalGames": 2,
              "totalVictories": 1,
              "totalDraws": 0,
              "totalLosses": 1,
              "goalsFavor": 1,
              "goalsOwn": 1,
              "goalsBalance": 0,
              "efficiency": 50
          },
          {
              "name": "Cruzeiro",
              "totalPoints": 3,
              "totalGames": 3,
              "totalVictories": 1,
              "totalDraws": 0,
              "totalLosses": 2,
              "goalsFavor": 6,
              "goalsOwn": 7,
              "goalsBalance": -1,
              "efficiency": 33.33
          },
          {
              "name": "Santos",
              "totalPoints": 2,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 2,
              "totalLosses": 0,
              "goalsFavor": 3,
              "goalsOwn": 3,
              "goalsBalance": 0,
              "efficiency": 33.33
          },
          {
              "name": "Bahia",
              "totalPoints": 2,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 2,
              "totalLosses": 0,
              "goalsFavor": 2,
              "goalsOwn": 2,
              "goalsBalance": 0,
              "efficiency": 33.33
          },
          {
              "name": "Minas Bras??lia",
              "totalPoints": 1,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 1,
              "totalLosses": 1,
              "goalsFavor": 1,
              "goalsOwn": 3,
              "goalsBalance": -2,
              "efficiency": 16.67
          },
          {
              "name": "Botafogo",
              "totalPoints": 0,
              "totalGames": 2,
              "totalVictories": 0,
              "totalDraws": 0,
              "totalLosses": 2,
              "goalsFavor": 1,
              "goalsOwn": 4,
              "goalsBalance": -3,
              "efficiency": 0
          },
          {
              "name": "Napoli-SC",
              "totalPoints": 0,
              "totalGames": 3,
              "totalVictories": 0,
              "totalDraws": 0,
              "totalLosses": 3,
              "goalsFavor": 1,
              "goalsOwn": 10,
              "goalsBalance": -9,
              "efficiency": 0
          }
      ]);
      })
      .catch(function (err) {
        throw err;
      })
    });
  })
  
});
