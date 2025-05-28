import mongoose from "mongoose";
import assert from "assert";
import User from "../src/dao/Users.dao.js";

mongoose.connect(
  "mongodb+srv://haiverhercas:12345@haiverhdz.knujl.mongodb.net/userpets?retryWrites=true&w=majority&appName=HaiverHdz"
);

describe("test dao usuarios", function() {
    this.timeout(5000);
    before(function(){
        this.userDao = new User()
    })

    beforeEach(async function(){
        await mongoose.connection.collections.users.drop();
    })

    it("el get de usuarios, retorna un array", async function(){
        const resultado = await this.userDao.get();
        assert.strictEqual(Array.isArray(resultado), true);
    })

    it("El Dao debe agregar un elemento a la base de datos", async function(){
        let usuario = {
            first_name: "Luisa",
            last_name: "Chacon",
            email: "luiisachacon@gmail.com",
            password: "lili1234"
        }

        const resultado = await this.userDao.save(usuario);
        assert.ok(resultado._id);
    })

    it("al agregar un usuario nuevo debe ir con un array vacio de mascotas por defecto", async function () {
        let usuario = {
            first_name: "Luisa",
            last_name: "Chacon",
            email: "luiisachacon@gmail.com",
            password: "lili1234"
        }

        const resultado = await this.userDao.save(usuario);
        assert.deepStrictEqual(resultado.pets, []);
    })

    it("el Dao debe otener un usuario por email", async function(){
        let usuario = {
            first_name: "Luisa",
            last_name: "Chacon",
            email: "luiisachacon@gmail.com",
            password: "lili1234"
        }

        await this.userDao.save(usuario);
        const user = await this.userDao.getBy({email: usuario.email});
        assert.strictEqual(typeof user, "object")
    })

    after(async function (){
        await mongoose.disconnect();
    })
})