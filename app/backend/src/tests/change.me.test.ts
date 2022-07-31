import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import loginMiddleware from '../middlewares/loginMiddleware';
import LoginService from '../services/loginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

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

});
