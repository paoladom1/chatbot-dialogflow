# Documentación

<a href="https://bit.ly/2DPEBau" target="_blank">Manual para biblioteca</a> 

<a href="https://bit.ly/3fCNEJE" target="_blank">Respuestas del bot</a> 

# Herramientas necesarias para ejecutar este proyecto 

* Node v10.24.1
* Asegúrate de tener npx instalado.

# Cómo usarlo

Primero, crea un agente en DialogFlow.

* git clone
* crea `/src/environments/environment.ts` con tu API client token

De la siguente manera:

```
export const environment = {
    production: true,
  
    dialogflow: {
      angularBot: '<API KEY>',
    },
  };

```

* npm install
* npx ng serve

El projecto original fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

