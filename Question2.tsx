import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
  }

  getStartDay(): number {
    const [start, end] = this.encontrarSecuenciaMasLarga();
    return start;
  }

  getEndDay(): number {
    const [start, end] = this.encontrarSecuenciaMasLarga();
    return end;
  }

  private encontrarSecuenciaMasLarga(): [number, number] {
    // Llamamos al API
    const numDias = this.api.getNumDays();
    
    // Creamos variables locales de esta funcion
    let maxLongitud = 0;
    let mejorInicio = 0;
    let mejorFin = 0;
    
    let inicio = 0;
    
    // Ciclo FOR que permite leer las temperaturas por día
    for (let fin = 0; fin < numDias; fin++) {
      let tempMin = this.api.getTemperatureOnDay(inicio);
      let tempMax = this.api.getTemperatureOnDay(inicio);
      
      // Actualizamos la temperatura mínima y máxima en el rango actual
      for (let i = inicio; i <= fin; i++) {
        const tempActual = this.api.getTemperatureOnDay(i);
        tempMin = Math.min(tempMin, tempActual);
        tempMax = Math.max(tempMax, tempActual);
      }

      // Ahora el condicionante de estar dentro de una diferencia de 5 grados
      while (tempMax - tempMin > 5) {
        inicio++;
        tempMin = this.api.getTemperatureOnDay(inicio);
        tempMax = this.api.getTemperatureOnDay(inicio);

        // Volvemos a calcular el rango de temperaturas en el nuevo rango
        for (let i = inicio; i <= fin; i++) {
          const tempActual = this.api.getTemperatureOnDay(i);
          tempMin = Math.min(tempMin, tempActual);
          tempMax = Math.max(tempMax, tempActual);
        }
      }

      // Creamos ahora un condicionante para expresar el mejor inicio y final
      if (fin - inicio + 1 > maxLongitud) {
        maxLongitud = fin - inicio + 1;
        mejorInicio = inicio;
        mejorFin = fin;
      }
    }
    
    return [mejorInicio, mejorFin];
  }
}

