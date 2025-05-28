import mongoose from "mongoose";
import assert from "assert";
import Adoption from "../src/dao/Adoption.js";
import User from "../src/dao/Users.dao.js";
import Pet from "../src/dao/Pets.dao.js";

mongoose.connect(
    "mongodb+srv://haiverhercas:12345@haiverhdz.knujl.mongodb.net/userpets?retryWrites=true&w=majority&appName=HaiverHdz"
  );
  
  describe("test dao usuarios", function() {
      this.timeout(5000);
      before(function(){
          this.adoptionDao = new Adoption()
          this.userDao = new User();
          this.petDao = new Pet();
      })
  
      beforeEach(async function () {
        await mongoose.connection.collections.adoptions.drop().catch(() => {});
        await mongoose.connection.collections.users.drop().catch(() => {});
        await mongoose.connection.collections.pets.drop().catch(() => {});
      });
  
   
      it("el get de adopciones, retorna un array", async function(){
        const resultado = await this.adoptionDao.get();
        assert.strictEqual(Array.isArray(resultado), true);
    })

    it("Debe crear una adopción correctamente", async function () {
        const user = await this.userDao.save({
          first_name: "Carlos",
          last_name: "Test",
          email: "carlos@example.com",
          password: "1234",
          pets: []
        });
    
        const pet = await this.petDao.save({
          name: "Rocky",
          specie: "dog",
          age: 3,
          adopted: false
        });
    
        const adoption = await this.adoptionDao.save({
          owner: user._id,
          pet: pet._id
        });
    
        assert.ok(adoption._id);
        assert.strictEqual(adoption.owner.toString(), user._id.toString());
        assert.strictEqual(adoption.pet.toString(), pet._id.toString());
      });

      it("Debe obtener una adopción por ID", async function () {
        const user = await this.userDao.save({
          first_name: "Elena",
          last_name: "Gómez",
          email: "elena@example.com",
          password: "1234",
          pets: []
        });
    
        const pet = await this.petDao.save({
          name: "Firulais",
          specie: "dog",
          age: 4,
          adopted: false
        });
    
        const adopcionCreada = await this.adoptionDao.save({
          owner: user._id,
          pet: pet._id
        });
    
        const resultado = await this.adoptionDao.getBy({ _id: adopcionCreada._id });
        assert.ok(resultado);
        assert.strictEqual(resultado._id.toString(), adopcionCreada._id.toString());
      });
     
  
      after(async function (){
          await mongoose.disconnect();
      })
  })