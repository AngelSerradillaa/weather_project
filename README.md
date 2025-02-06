# Javascript - Tarea 1

## Introducción

En esta tarea se ha realizado una aplicación que genera la predicción semanal del tiempo basada en parámetros aleatorios dentro de unos límites. Para conseguir este objetivo la aplicación está formada por un pequeño archivo html y css, que ayuda a la representación visual de la parte principal, el archivo Javascript donde se encuentra el funcionamiento de la tarea.

## Funcionamiento

- Uso del DOM

  En este caso el Document Object Model se utiliza para identificar el botón que genera la predicción del tiempo, poniendo en ejecución el funcionamiento de la app.
  ```
  <div class="main-container">
      <button id="generarTemperatura" class="btn-generate">Generar predicción</button>
      <div id="temperaturaSemana"></div>
      <div id="temperaturasMedias"></div>
  </div>
  ```
  ```
  const button = document.getElementById("generarTemperatura");
  button.addEventListener("click", generarHTML);
  ```
- Objeto Weather

  Se ha creado un objeto Weather que representa la predicción meteorológica de un día con sus atributos temperaturaMínima, temperaturaMáxima, clima y velocidadViento.
  ```
  function Weather(temperaturaMinima, temperaturaMaxima, clima, velocidadViento) {
    this.temperaturaMinima = temperaturaMinima; 
    this.temperaturaMaxima = temperaturaMaxima; 
    this.clima = clima; // opciones: soleado, parcialmente nublado, nublado, lluvia, nieve
    this.velocidadViento = velocidadViento; 

    // Método para calcular la temperatura media del día
    this.calcularTemperaturaMedia = function () {
        return (this.temperaturaMinima + this.temperaturaMaxima) / 2;
    };
  }
  ```
- Funciones y cálculos

  El resto del funcionamiento se realiza con dos funciones, la primera es "generarValoresAleatorios()" que realiza la asignación de los atributos de un objeto Weather dentro de unos valores aleatorios que se han decidido para que se generen valores creíbles dentro de lo     que cabe.
  ```
  function generarValoresAleatorios() {
    const climas = ["soleado", "parcialmente nublado", "nublado", "lluvia", "nieve"];
    return {
        temperaturaMinima: Math.floor(Math.random() * 13), // Entre 0 y 12
        temperaturaMaxima: Math.floor(Math.random() * 13) + 18, // Entre 18 y 30
        clima: climas[Math.floor(Math.random() * climas.length)],
        velocidadViento: Math.floor(Math.random() * 41) // Entre 0 y 40 km/h
    };
  }
  ```
  La segunda, "generarHTML()" genera los 7 objetos Weather con sus valores y los almacena en un array. Además calcula las temperaturas medias máximas y mínimas y genera el código HTML necesario para representar visualmente todos estos datos.
  ```
  function generarHTML(){
    console.log("Hola");

    const temperaturasSemana = Array.from({ length: 7 }, () => {
        const valores = generarValoresAleatorios();
        return new Weather(
            valores.temperaturaMinima,
            valores.temperaturaMaxima,
            valores.clima,
            valores.velocidadViento
        );
    });

    // Calcular la media de las temperaturas máximas y mínimas
    const sumaMaximas = temperaturasSemana.map(dia => dia.temperaturaMaxima).reduce((a, b) => a + b, 0);
    const sumaMinimas = temperaturasSemana.map(dia => dia.temperaturaMinima).reduce((a, b) => a + b, 0);

    const mediaMaximas = sumaMaximas / temperaturasSemana.length;
    const mediaMinimas = sumaMinimas / temperaturasSemana.length;

    const contenedor = document.getElementById("temperaturaSemana");
    const contenedorMedias = document.getElementById("temperaturasMedias");
    let climaDia = "";
    contenedor.innerHTML = ""; // Limpiar contenido previo

    temperaturasSemana.forEach((dia, index) => {

        switch(dia.clima){
            case "soleado":
                climaDia = `<i class="fa-regular fa-sun"></i>`;
                break;
            case "parcialmente nublado":
                climaDia = `<i class="fa-solid fa-cloud-sun imgClima"></i>`;
                break;
            case "nublado":
                climaDia = `<i class="fa-solid fa-cloud imgClima"></i>`;
                break;
            case "lluvia":
                climaDia = `<i class="fa-solid fa-cloud-rain imgClima"></i>`
            case "nieve":
                climaDia = `<i class="fa-regular fa-snowflake imgClima"></i>`
        }

        const diaHTML = `
            <div class="day">
                
                <h3 class= "title-day">Día ${index + 1}</h3>
                ${climaDia}
                <p class="text-day">Temperatura mínima: ${dia.temperaturaMinima}°C</p>
                <p class="text-day">Temperatura máxima: ${dia.temperaturaMaxima}°C</p>
                <p class="text-day">Velocidad del viento: ${dia.velocidadViento} km/h</p>
                <p class="text-day">Temperatura media: ${dia.calcularTemperaturaMedia().toFixed(2)}°C</p>
            </div>
        `;
        contenedor.innerHTML += diaHTML;
    });

    contenedorMedias.innerHTML = "";

    const mediasHTML = `
        <p>La temperatura máxima media de la semana es: ${mediaMaximas.toFixed(2)} ºC</p>
        <p>La temperatura mínima media de la semana es: ${mediaMinimas.toFixed(2)} ºC</p>
    `;
    contenedorMedias.innerHTML += mediasHTML;
  }
  ```
  















