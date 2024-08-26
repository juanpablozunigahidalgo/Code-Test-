import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;

  constructor(api: api.APICaller) {
    this.api = api;
  }

  /**
   * Task 1: Return the number of unique numbers in the list.
   * 
   * @return {number}
   */
  uniqueNumbers(): number {
    const numberCount = this.api.getNumberCount();
    const uniqueNumbersSet = new Set<number>();

    // Add each number to the set to track distinct values
    for (let i = 0; i < numberCount; i++) {
      uniqueNumbersSet.add(this.api.getNumber(i));
    }

    // The size of the set represents the count of unique numbers
    return uniqueNumbersSet.size;
  }

  /**
   * Task 2: Return the number of pairs in the list (see description for
   * how we define pairs).
   * 
   * @return {number}
   */
  numberOfPairs(): number {
    const numberCount = this.api.getNumberCount();
    const numberMap = new Map<number, number>();

    for (let i = 0; i < numberCount; i++) {
      const num = this.api.getNumber(i);
      numberMap.set(num, (numberMap.get(num) || 0) + 1);
    }

    let pairs = 0;
    numberMap.forEach(count => {
      if (count === 2) {
        pairs++;
      }
    });

    return pairs;
  }

  /**
   * Task 3: Return the highest pair in the list.
   * 
   * @return {number}
   */
  highestPair(): number {
    const numberCount = this.api.getNumberCount();
    const numberMap = new Map<number, number>();

    for (let i = 0; i < numberCount; i++) {
      const num = this.api.getNumber(i);
      numberMap.set(num, (numberMap.get(num) || 0) + 1);
    }

    let highestPair = -1;
    numberMap.forEach((count, num) => {
      if (count === 2 && num > highestPair) {
        highestPair = num;
      }
    });

    return highestPair;
  }
}
