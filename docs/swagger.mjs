const swaggerDoc = {
    openapi: "3.0.0",
    info: {
        title: "Movies API",
        version: "1.0.0",
        description: "API para gestionar películas y directores."
    },
    paths: {
        "/directors": {
            get: {
                summary: "Obtener todos los directores",
                responses: {
                    "200": {
                        description: "Lista de directores"
                    }
                }
            }
        }
    }
};

export default swaggerDoc;
