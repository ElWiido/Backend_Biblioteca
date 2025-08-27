## 🚀 Tecnologías del Proyecto

| Tecnología   | Versión   |
|--------------|-----------|
| **Node.js**  | 22.18.0   |
| **npm**      | 10.5.0    |
| **Express.js** | 5.1.0   |
| **Base de Datos** | SQL Server |



[Frontend] (https://github.com/ElWiido/Frontend_Biblioteca)

## Project Setup

```sh
npm install
```

## Install express

```sh
npm install express
```


### Compile and Hot-Reload for Development

```sh
npm install -g nodemon
nodemon app
```

## IMPORTANT Environment Variables (.env)

Create a `.env` file in the root of the project with the following structure:

PORT = 3000
USER = database_user
PASSWORD = database_password
DB_SERVER=localhost
DB_DATABASE= database_name
DB_DIALECT=mssql
DB_PORT= database_port
EMAIL= nodemailer
EMAIL_PASSWORD= nodemailer