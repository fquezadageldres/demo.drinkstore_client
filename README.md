# Tienda online de licores 

Demo aplicación cliente, tienda online de licoreria desarrollada con html, js y css

## Tabla de contenido

* [About this Project](#about-this-project)
* [Getting Started](#getting-started)
  * [Local Installation](#local-installation)

## About this project

Interfaz de usuario de tienda online de licores, se pueden ver los productos con obtenidos desde la API
[(ver api)](https://github.com/fquezadageldres/demo.drinkstore_server), aplicar filtros segun criterios de busqueda, paginación y ordenarlos segun precio, da la opción de 
agregarlos a un carro de compras 

El deploy esta realizado en gt-pages en la siguiente url: [http://fquezadageldres.com/demo.drinkstore_client](http://fquezadageldres.com/demo.drinkstore_client)

## Getting Started

### Local installation

1. Clona el proyecto

```bash
  git clone https://github.com/fquezadageldres/demo.drinkstore_client.git
```

2. Cambia las url de la API en providers.js 

```js
  Dev:    this.url = "localhsot:3000/v1/";
  Prod:   this.url = "https://demo-drinkstore-server.herokuapp.com/v1/";
```

3. Inicia el index.js desde el navegador o con LiveServer en VSC

  

  
