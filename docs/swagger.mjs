const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Movies API',
        version: '1.0.0',
        description: 'API para gestionar películas y directores',
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 4500}`,
        },
    ],
    components: {
        schemas: {
            Movie: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID único de la película',
                    },
                    title: {
                        type: 'string',
                        description: 'Título de la película',
                    },
                    year: {
                        type: 'number',
                        description: 'Año de lanzamiento de la película',
                    },
                    director: {
                        type: 'string',
                        description: 'Director de la película',
                    },
                },
                required: ['title', 'year', 'director'],
            },
            Director: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'ID único del director',
                    },
                    id: {
                        type: 'number',
                        description: 'ID único del director (definido por el usuario)',
                    },
                    name: {
                        type: 'string',
                        description: 'Nombre del director',
                    },
                    country: {
                        type: 'string',
                        description: 'País de origen del director',
                    },
                    movies: {
                        type: 'array',
                        items: {
                            type: 'string',
                            description: 'ID de las películas dirigidas por el director',
                        },
                    },
                },
                required: ['id', 'name', 'country', 'movies'],
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        '/movies': {
            post: {
                summary: 'Crear una nueva película',
                tags: ['Movies'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Movie',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Película creada exitosamente',
                    },
                    500: {
                        description: 'Error al crear la película',
                    },
                },
            },
            get: {
                summary: 'Obtener todas las películas',
                tags: ['Movies'],
                responses: {
                    200: {
                        description: 'Lista de películas',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Movie',
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Error al obtener las películas',
                    },
                },
            },
        },
        '/movies/{id}': {
            delete: {
                summary: 'Eliminar una película por ID',
                tags: ['Movies'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'string',
                        },
                        required: true,
                        description: 'ID de la película a eliminar',
                    },
                ],
                responses: {
                    200: {
                        description: 'Película eliminada correctamente',
                    },
                    404: {
                        description: 'Película no encontrada',
                    },
                    500: {
                        description: 'Error al eliminar la película',
                    },
                },
            },
            put: {
                summary: 'Actualizar una película por ID',
                tags: ['Movies'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'string',
                        },
                        required: true,
                        description: 'ID de la película a actualizar',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Movie',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Película actualizada correctamente',
                    },
                    404: {
                        description: 'Película no encontrada',
                    },
                    500: {
                        description: 'Error al actualizar la película',
                    },
                },
            },
        },
        '/directors': {
            post: {
                summary: 'Crear un nuevo director',
                tags: ['Directors'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Director',
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Director creado exitosamente',
                    },
                    400: {
                        description: 'Algunas películas no fueron encontradas',
                    },
                    500: {
                        description: 'Error al crear el director',
                    },
                },
            },
            get: {
                summary: 'Obtener todos los directores',
                tags: ['Directors'],
                responses: {
                    200: {
                        description: 'Lista de directores',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Director',
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Error al obtener los directores',
                    },
                },
            },
        },
        '/directors/{id}': {
            get: {
                summary: 'Obtener un director por ID',
                tags: ['Directors'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'number',
                        },
                        required: true,
                        description: 'ID del director a obtener',
                    },
                ],
                responses: {
                    200: {
                        description: 'Director encontrado',
                    },
                    404: {
                        description: 'Director no encontrado',
                    },
                    500: {
                        description: 'Error al obtener el director',
                    },
                },
            },
            put: {
                summary: 'Actualizar un director por ID',
                tags: ['Directors'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'number',
                        },
                        required: true,
                        description: 'ID del director a actualizar',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Director',
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Director actualizado correctamente',
                    },
                    404: {
                        description: 'Director no encontrado',
                    },
                    500: {
                        description: 'Error al actualizar el director',
                    },
                },
            },
            delete: {
                summary: 'Eliminar un director por ID',
                tags: ['Directors'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'number',
                        },
                        required: true,
                        description: 'ID del director a eliminar',
                    },
                ],
                responses: {
                    200: {
                        description: 'Director eliminado correctamente',
                    },
                    404: {
                        description: 'Director no encontrado',
                    },
                    500: {
                        description: 'Error al eliminar el director',
                    },
                },
            },
        },
    },
};

export default swaggerSpec;
