import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";
import petModel from "../dao/models/Pet.js";
import userModel from "../dao/models/User.js";

class MockingService {
  static async generatePetsMocking(cantidad) {
    const pets = [];
    for (let i = 0; i < cantidad; i++) {
      pets.push({
        name: faker.animal.dog(),
        specie: faker.animal.type(),
        adopted: false,
        birtDate: faker.date.past(),
        image: "https://via.placeholder.com/150",
      });
    }
    return pets;
  }
  static async generateUsersMocking(
    cantidadUsuarios,
    cantidadMascotasPorUsuario = 1
  ) {
    const users = [];

    for (let i = 0; i < cantidadUsuarios; i++) {
      const role = Math.random() < 0.2 ? "admin" : "user";
      const hashedPassword = await createHash("coder123");

      const mockPets = await this.generatePetsMocking(
        cantidadMascotasPorUsuario
      );
      const savedPets = await petModel.insertMany(mockPets);

      const petRefs = savedPets.map((p) => ({ _id: p._id }));

      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role,
        pets: petRefs,
      });
    }

    return users;
  }
  static async generateFullMockData(userCount, petsCount) {
    const users = await this.generateUsersMocking(userCount, petsCount);
    const insertedUsers = await userModel.insertMany(users);

    return {
      usersInserted: insertedUsers.length,
      petsInserted: userCount * petsCount,
    };
  }
  static async fetchMockingUsers(limit = 50) {
    const users = await userModel.find().limit(limit).populate("pets._id", "name");
    const simplifiedUsers = users.map(user => ({
      first_name: user.first_name,  
      pets: user.pets.map(pet => pet._id)  
    }));
  
    return simplifiedUsers;  
  }
}

export default MockingService;
