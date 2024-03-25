# Library - ICP App

## Descripción

Este proyecto es realizado como parte del bootcamp `ICP Developer`.

Es una aplicación para administrar una biblioteca de libros, en la cual se pueden crear nuevos registros de libros y autores, visualizar la lista de libros registrados, editar o eliminar los libros registrados, así como ver la lista de autores y de libros de cada autor.

## Desarrollo

Se desarrolló usando el lenguaje de programación [Motoko](https://internetcomputer.org/docs/current/motoko/main/motoko) para el backend, y TypeScript para el frontend, usando Vite y React.

Para su desarrollo y ejecución es importante tener instalado el [SDK de Internet Computer](https://internetcomputer.org/docs/current/developer-docs/setup/install)

## Ejecución local

Para ejecutar el proyecto localmente, el primer paso es clonar el repositorio. Ya sea usando git o descargando el zip que contiene el código fuente.

A continuación, inicia una terminal y dirígete a la carpeta que contiene el proyecto, y ejecuta los siguientes comandos

```bash
# Ir a la carpeta
cd ~/folder

# Instalar dependencias
npm install

# Iniciar la replica y ejecutar en segundo plano
dfx start --clean --background

# Desplegar canisters a la replica y generar las interfaces
dfx deploy
```

Una vez completado este proceso, la aplicación se podrá acceder usando el siguiente enlace:

http://be2us-64aaa-aaaaa-qaabq-cai.localhost:8000/

Se recomienda usar los navegadores Chrome o Firefox. No usar Safari.

## Equipo

Este proyecto fue desarrollado por [Jahir Fiquitiva](https://bio.jahir.dev) y [Christian Riaño](https://github.com/christianrv29)
