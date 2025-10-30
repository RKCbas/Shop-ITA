# Shop-ITA

<!-- TODO: Generar una descripción del sistema e incluir a los integrantes -->

## Requerimientos

- Tener NPM instalado

- Tener Angular CLI

- Tener MySQL Server de manera local

## Instalación y Tutoriales de requerimientos

Instalar Node y NPM:

- [Node y NPM](https://youtu.be/Z-Ofqd2yBCc?si=XIF0bo6XGG111jwT)

Instalar Angular CLI (Se requiere antes tener NODE):

```bash
npm install -g @angular/cli
```

Instalar MySQL Server y MySQL Workbench:

- [MySQL](https://youtu.be/EmQZt6o6-78?si=8wymQGnWdRIbgRjg)

> **NOTA**: Para la configuración e instalación individual de los sistemas dirigirse a los archivos `README.md` del los sistemas correspondientes

## Estructura básica de directorios

Shop-ITA/
    ├── backend/ (Node.js)
    |    ├── config/ (Contiene la configuración básico de la aplicación de express y la conexión a la DB)
    |    ├── controllers/ (Contiene los controladores)
    |    ├── middleware/ (Contiene middlewares para Logs y en caso de que no se encuentre una ruta)
    |    ├── migrations/ (Contiene los scripts de migraciones)
    |    ├── routers/ (contiene los routers de la aplicación)
    |    ├── .env.template (Es el template para el `.env`)
    |    ├── index.js (Es donde el servidor de Node se va a inicializar)
    |    ├── migrate.js (Es el script que va a ejecutar las migraciones)
    |    ├── package.json (Es el archivo de configuración de paquetes de la aplicación)
    |    └── README.md (Documentación)
    |
    └── frontend/ (Angular)
        ├── public/
        ├── scripts/
        ├── src/
        |   ├── app/ (Donde se encuentra el front de la aplicación)
        |   ├── environments/ (directorio creado con los scripts para las variables de entorno)
        |   └── index.html (donde se encuentra la raíz de la aplicación)
        |
        ├── package.json (Es el archivo de configuración de paquetes de la aplicación)
        ├── README.md (Documentación)
        └── tsconfig.json (json con configuración de TS)
