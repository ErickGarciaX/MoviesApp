# MoviesApp

Movies App es una aplicacion con la cual podemos realizar un CRUD dentro de 2 diferentes entidades, peliculas y directores.

Este proyecto esta diseñado con .net 10 (c#) desarrollado con Clean Architecture Code la cual facilita la lectura y mejoras del codigo. 

Se crea una API con la cual tenemos una comunicacion en el Front End, El cual 
Esta desarrollado con el FrameWork de Angular (Typescript).


MANUAL PARA CORRER EL PROYECTO: 

Backend (.NET + SQL Server)

.NET 10 SDK 

SQL Server y SQL Server Management Studio

Visual Studio 2022 o VS Code

Frontend (Angular)

Node.js (v18 o superior)

Angular CLI (npm install -g @angular/cli)

Navegador (De tu preferencia)

-Instalar la base de datos: 

Con SQL Server Crearemos una base de datos (MoviesApp) una vez creada tenemos que utilizar el esquema generado que se encuentre en la parte de codigo del mismo repositorio, lo instalamos correctamente a nuestra base de datos 
y ahora en la aprte de MoviesApp.API / appsettings.json debemos de ingresar correctamente la Conection String de nuestra base de datos para que tenga una conexion exitosa. ya una vez conectada correctamente debemos correr la API la cual se encargara de enviar y recibir informacion atraves de peticiones HTTP para nuestro Front End que es donde interactua con el usuario

Ahora solo debemos de instalar angular, para eso lo recomendado es crear una carpeta y llamarla como el proyecto, ingresamos a esa carpeta y instalamos Angular 

Instala dependencias:
npm install
Verifica en el archivo environment.ts que la URL de tu API sea correcta

Finalmente ejecutamos el proyecto de Angular: 
ng serve

Con estos pasos Podrias satisfactoriamente utilizar la aplicacion.

Recomendacion (Clona el repositorio :p)

