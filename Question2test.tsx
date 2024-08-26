import * as api from './api';
import { Solution } from './solution';

// Mock API implementation for testing
class MockAPICaller implements api.APICaller {
  private temperatures: number[];

  constructor(temperatures: number[]) {
    this.temperatures = temperatures;
  }

  getNumDays(): number {
    return this.temperatures.length;
  }

  getTemperatureOnDay(day: number): number {
    return this.temperatures[day];
  }
}

// Custom test case
const temperatures = [7, 12, 5, 3, 11, 6, 10, 2, 9];
const mockApi = new MockAPICaller(temperatures);
const solution = new Solution(mockApi);

console.log("Temperaturas Generadas:", temperatures);
console.log("Inicio del Día:", solution.getStartDay());
console.log("Fin del Día:", solution.getEndDay());
