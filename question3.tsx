import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
    console.log('¡Presiona ejecutar código para ver esto en la consola!')
  }

  /**
   * Tarea 1: Devuelve el número de direcciones en las que el agua puede fluir
   * desde la posición inicial.
   * 
   * @return {number}
   */
  initialDirections(): number {
    const startX = this.api.get_start_x();
    const startY = this.api.get_start_y();
    const currentValue = this.api.get_value(startX, startY);

    // Direcciones posibles: arriba, abajo, izquierda, derecha
    const directions = [
      [0, -1], // Arriba
      [0, 1],  // Abajo
      [-1, 0], // Izquierda
      [1, 0]   // Derecha
    ];

    let count = 0;

    // Función auxiliar local para verificar si una posición está dentro de los límites de la matriz
    const isValidPosition = (x: number, y: number): boolean => {
      return x >= 0 && y >= 0 && x < this.api.get_matrix_width() && y < this.api.get_matrix_height();
    };

    for (const [dx, dy] of directions) {
      const newX = startX + dx;
      const newY = startY + dy;

      // Verificar si la nueva posición es válida antes de acceder al valor
      if (isValidPosition(newX, newY)) {
        const neighborValue = this.api.get_value(newX, newY);
        if (neighborValue <= currentValue) {
          count++;
        }
      }
    }

    return count;
  }

  /**
   * Tarea 2: Devuelve el número de posiciones a las que el agua puede llegar
   * al fluir a través de la matriz (incluyendo el punto inicial).
   * 
   * @return {number}
   */
  numberOfWetIndexes(): number {
    const startX = this.api.get_start_x();
    const startY = this.api.get_start_y();
    const visited = new Set<string>();
    const stack: [number, number][] = [[startX, startY]];
    let count = 0;

    // Función auxiliar local para verificar si una posición está dentro de los límites de la matriz
    const isValidPosition = (x: number, y: number): boolean => {
      return x >= 0 && y >= 0 && x < this.api.get_matrix_width() && y < this.api.get_matrix_height();
    };

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const posKey = `${x},${y}`;

      if (!visited.has(posKey)) {
        visited.add(posKey);
        count++;

        const currentValue = this.api.get_value(x, y);

        // Explorar vecinos
        const directions = [
          [0, -1], [0, 1], [-1, 0], [1, 0] // Arriba, Abajo, Izquierda, Derecha
        ];

        for (const [dx, dy] of directions) {
          const newX = x + dx;
          const newY = y + dy;

          if (isValidPosition(newX, newY)) {
            const neighborValue = this.api.get_value(newX, newY);
            if (neighborValue <= currentValue && !visited.has(`${newX},${newY}`)) {
              stack.push([newX, newY]);
            }
          }
        }
      }
    }

    return count;
  }
}
