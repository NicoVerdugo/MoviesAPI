# API RESTful - Gestión de Peliculas y Directores

## 📌 Descripción
Esta API permite gestionar directores y peliculas.

- **Nicolás Alejandro Chaparro Verdugo**
- **Codigo: 202021532**

## URL del Servicio
 [API en Render](https://moviesapi-jp3v.onrender.com)

## 🚀 Tecnologías Utilizadas
- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **JSON Web Tokens (JWT)** para autenticación
- **Swagger** para documentación
- **Render** para despliegue en la nube

## 🛠 Instalación Local
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/NicoVerdugo/MoviesAPI.git
   cd MoviesAPI
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar variables de entorno (`.env`):
   ```env
   PORT=4500
MONGO_URI=mongodb+srv://nicolaschaparro02:db1234@cluster0.fqawc0e.mongodb.net/moviesDB?retryWrites=true&w=majority
   TOKEN_SECRET=token
   ```
4. Iniciar el servidor:
   ```sh
   node index.js
   ```

## 📖 Documentación Swagger
Para acceder a la documentación de la API en:
[Swagger UI](https://moviesapi-jp3v.onrender.com/api-docs/)


## 🔐 Autenticación
Todos los endpoints de peliculas y directores requieren autenticación mediante un **token JWT**, esto mediante el encabezado en el encabezado `Authorization`:
```sh
Authorization: Bearer token
```

## 🏗 Arquitectura del Proyecto

- controllers
-- directorController.mjs
-- movieController.mjs
- docs
-- swagger.mjs
- middleware.mjs
-- auth.mjs
- Models
-- Director.mjs
-- Movie.mjs
-- User.mjs
- routes
-- auth.mjs
-- director.mjs
-- movie.mjs

- .env
- app.mjs
- index.mjs
