
const button = document.getElementById("generarTemperatura");

// Parte 1: Crear una función constructora para el objeto Weather
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

// Función auxiliar para generar valores aleatorios para las propiedades del objeto
function generarValoresAleatorios() {
    const climas = ["soleado", "parcialmente nublado", "nublado", "lluvia", "nieve"];
    return {
        temperaturaMinima: Math.floor(Math.random() * 13), // Entre 0 y 12
        temperaturaMaxima: Math.floor(Math.random() * 13) + 18, // Entre 18 y 30
        clima: climas[Math.floor(Math.random() * climas.length)],
        velocidadViento: Math.floor(Math.random() * 41) // Entre 0 y 40 km/h
    };
}



function generarHTML(){
    console.log("Hola");

    // Parte 3: Guardar datos de la temperatura de una semana en un array
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
button.addEventListener("click", generarHTML);