const request_url = require("supertest")("https://barru.pythonanywhere.com");
const validasi = require("chai").expect;

describe("Verify Register Feature", function(){
    it("Verify Success Register with data valid", async function(){
        let random_email = Math.random().toString(36).substring(7);
        const response = await request_url

        .post("/register")
        .send({ name: random_email, email: random_email + "@gmail.com", password: random_email });

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(200);
        validasi(response.body.data).to.eql('berhasil');
        validasi(response.body.message).to.eql('created user!');
        validasi(response.body.status).to.eql('SUCCESS_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )

    it("Failed Register with empty name and valid email, password", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "", email: "dede@gmail.com", password: "dede123"});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
        validasi(response.body.message).to.eql('Gagal Registrasi');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )

    it("Failed Register with empty email and valid name, password", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "dede", email: "", password: "dede123"});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
        validasi(response.body.message).to.eql('Gagal Registrasi');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )
    
    it("Failed Register with empty password, valid email and name", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "dede", email: "dede@gmail.com", password: ""});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('email/Username/Password tidak boleh kosong');
        validasi(response.body.message).to.eql('Gagal Registrasi');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )

    it("Failed Register with invalid email, valid name and password", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "dede", email: "dedegmail.com", password: "dede123"});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('Email tidak valid');
        validasi(response.body.message).to.eql('Cek kembali email anda');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )

    it("Failed Register with valid email and name, password with symbol", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "dede", email: "dede@gmail.com", password: "dede123@@"});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('Nama atau password tidak valid');
        validasi(response.body.message).to.eql('Tidak boleh mengandung symbol');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )

    it("Failed Register with valid email and password, name with symbol", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "dede!!@@", email: "dede@gmail.com", password: "dede123"});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('Nama atau password tidak valid');
        validasi(response.body.message).to.eql('Tidak boleh mengandung symbol');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )

    it("failed Register with email already used", async function(){
        const response = await request_url

        .post("/register")
        .send({name: "dede", email: "dede@gmail.com", password: "dede123"});

        const isi_body= response.body;

        validasi(response.statusCode).to.eql(420);
        validasi(response.body.data).to.eql('Email sudah terdaftar, gunakan Email lain');
        validasi(response.body.message).to.eql('Email sudah terdaftar, gunakan Email lain');
        validasi(response.body.status).to.eql('FAILED_REGISTER');
        validasi(isi_body).to.include.keys("data","message","status");
    }
    )
}
)