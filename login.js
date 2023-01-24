const request_url = require("supertest")("http://barru.pythonanywhere.com"); // URL NGARAH KESINI
const validasi = require("chai").expect;

describe("Verify Login Feature", function () { // TEST SCENARIO
  it("Verify succes login with data valid", async function () { // TEST CASE
    const response = await request_url // INI NGARAH KE URL BARRU.PYTHONANYWHERE.COM
      .post("/login") 
      .send({ email: "dede11@gmail.com", password: "dede123" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(200);
    validasi(response.body.status).to.eql('SUCCESS_LOGIN');
    validasi(response.body.data).to.eql('Welcome ');
    validasi(response.body.message).to.eql('Anda Berhasil Login');
    validasi(isi_body).to.include.keys("data", "message", "status", "credentials"); 
  });

  it("failed login with email not registered", async function () { 
    const response = await request_url 
      .post("/login") 
      .send({ email: "dd@gmail.com", password: "asdasdasdasd" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.data).to.eql('Users not found');
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });

  it("failed login with email invalid", async function () { 
    const response = await request_url 
      .post("/login") 
      .send({ email: "dedegmail.com", password: "asdasdasdasd" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.data).to.eql('Email tidak valid');
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });

  it("failed login with empty email and password", async function () {
    const response = await request_url 
      .post("/login") 
      .send({ email: "", password: "" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.data).to.eql('Email tidak valid');
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });

  it("failed login with wrong password", async function () {
    const response = await request_url 
      .post("/login") 
      .send({ email: "dede123@gmail.com", password: "sjasdjhada" });

    const isi_body = response.body;

    validasi(response.statusCode).to.eql(420);
    validasi(response.body.data).to.eql('Users not found');
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(isi_body).to.include.keys("data", "message", "status"); 
  });
});