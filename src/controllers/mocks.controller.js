import MockingService from "../services/mocking.js";

const createPets = async (req, res) => {
  const pets = await MockingService.generatePetsMocking(50);
  res.send({ status: "exitoso", payload: pets });
};

const createUsers = async (req, res) => {
  const users = await MockingService.generateUsersMocking(50, 2);
  res.send({ status: "sucess", payload: users });
};

const generateMockDataController = async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    if (isNaN(users) || isNaN(pets)) {
      return res
        .status(400)
        .json({ status: "error", message: "users y pets deben ser numéricos" });
    }

    const result = await MockingService.generateFullMockData(
      parseInt(50),
      parseInt(2)
    );

    res.status(201).json({
      status: "success",
      message: "Datos generados correctamente",
      ...result,
    });
  } catch (error) {
    console.error("Error en generateMockDataController:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error interno del servidor" });
  }
};

const getMockingUsers = async (req, res) => {
  try {
    const users = await MockingService.fetchMockingUsers(50);
    const totalUsers = users.length;
    const totalPets = users.reduce((acc, user) => acc + (user.pets?.length || 0), 0);

    res.status(200).json({
      status: 'success',
      payload: users,
      totalUsers,
      totalPets
    });
  } catch (error) {
    console.error("Error en getMockingUsers:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al obtener usuarios" });
  }
};

export default { createPets, createUsers, generateMockDataController, getMockingUsers };
