import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition:{
        openapi: "3.0.1",
        info: {
            title:"Documentacion de la entrega final",
            description: "App dedicada a buscarle hogar a mascotas abandonadas"
        }
    },
    apis:["./src/docs/**/*.yaml"]
};

const specs = swaggerJSDoc(swaggerOptions);

export default specs;