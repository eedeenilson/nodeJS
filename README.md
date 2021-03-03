# nodeJS API RESTful

API RESTFul de prueba para comunicarse a traves de sus `endpoints`.

## Instalacion

1- Clonar este repositorio
```bash
[HTTP]
https://github.com/eedeenilson/nodeJS.git
[SSH]
git@github.com:eedeenilson/nodeJS.git
```

2- Instalar todos los paquetes necesarios
```bash
npm i
````

3- Ejecutar
```bash
npm start
```

4- Abrir cualquier navegador web e ir a http://localhost:3000/api/`endpoint`

5- Endpoints
```bash 
En el archivo /app/routes/routes.js 
se encuentran todos los endpoints.

Tambien puedes leer el api-explorer
[https://github.com/eedeenilson/nodejs-apiExplorer.git]
```
6- Scaffolding

```bash
helping-api
    |_app
    |   |_controllers
    |   |_db
    |   |_models
    |   |_routes
    |
    |_.gitignore
    |_README.md
    |_apidoc.json
    |_index.js
    |_package-lock.json
    |_package.json
```



## Uso

```bash
Recuerda que debes tener la base de datos lista.
Con las siguientes credenciales:

host: "localhost",
user: "root",
password: "password",
database: "database"

Sino, puedes modificarlos en el archivo db.js, bajo el directorio
/app/db/
```

## Contribiciones
`Esta plantilla` fue creada por nilson094.


## Derechos de autor
Copyright © 2020