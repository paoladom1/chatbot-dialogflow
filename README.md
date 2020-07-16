# Documentación

<a href="https://bit.ly/2DPEBau" target="_blank">Manual para biblioteca</a> 

<a href="https://bit.ly/3fCNEJE" target="_blank">Respuestas del bot</a> 

# Comó usarlo

Primero, crea un agente en DialogFlow.

* git clone
* create `/src/environments/environment.ts` with your API client token

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
* ng serve

El projecto original fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

