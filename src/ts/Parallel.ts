/*
Реализовать функцию параллельной потоковой обработки данных. В конструктор передается число парралельных "потоков", которое указывает сколько данных обрабатывается в конкретный момент времени
const runner = new Parallel(2);
console.log(await runner
.jobs(
() => new Promise((resolve) => setTimeout(resolve, 10, 1)),
() => new Promise((resolve) => setTimeout(resolve, 50, 2)),
() => new Promise((resolve) => setTimeout(resolve, 20, 3)),
() => new Promise((resolve) => setTimeout(resolve, 90, 4)),
() => new Promise((resolve) => setTimeout(resolve, 30, 5)),
)) // [1, 3, 2, 4, 5];
 */
export {}

class Parallel {
  private readonly threadCounter: number;
  private runningTasks: Promise<number>[] = [];

  constructor(threadNumber: number) {
    this.threadCounter = threadNumber;
  }

  public jobs(...callbacks: (() => Promise<number>)[]): Promise<number[]> {

    const taskLoop = async (results: number[]) => {
      if (callbacks.length > 0) {
        while (this.runningTasks.length < this.threadCounter && callbacks.length > 0) {
          this.runningTasks.push(callbacks.shift()());
        }
        const tasksArr = await Promise.all(this.runningTasks);
        this.runningTasks = [];
        results = results.concat(tasksArr);
        return taskLoop(results);
      } else {
        return results;
      }
    };

    return new Promise((resolve) => {
      taskLoop([]).then((results) => resolve(results));
    });
  }
}

const runner = new Parallel(2);

runner.jobs(
  () => new Promise((resolve) => setTimeout(resolve, 70, 1)),
  () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
  () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
  () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
  () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
).then((results) => console.log(results)); // [1, 3, 2, 4, 5];
