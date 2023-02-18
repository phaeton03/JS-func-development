class Parallel {
  numThreads: number;
  runningTasks: Promise<unknown>[] = [];

  constructor(numThreads: number) {
    this.numThreads = numThreads;
  }

  jobs<T>(...tasks: (() => Promise<T>)[]): Promise<T[]> {
    const results: T[] = new Array(tasks.length).fill(null);

    return new Promise((resolve) => {
      let numCompletedTasks = 0;
      let nextTaskIndex = 0;

      const executeNextTask = () => {
        if (numCompletedTasks === tasks.length) {
          resolve(results);
          return;
        }

        if (nextTaskIndex >= tasks.length) {
          return;
        }

        const task = tasks[nextTaskIndex];
        const resultIndex = nextTaskIndex;

        nextTaskIndex++;

        const taskPromise = task().then((result) => {
          results[resultIndex] = result;
          numCompletedTasks++;
          removeRunningTask(taskPromise);
          executeNextTask();
        });

        this.runningTasks.push(taskPromise);

        if (this.runningTasks.length < this.numThreads) {
          executeNextTask();
        }
      };

      const removeRunningTask = (taskPromise: Promise<unknown>) => {
        const taskIndex = this.runningTasks.indexOf(taskPromise);
        this.runningTasks.splice(taskIndex, 1);
      };

      executeNextTask();
    });
  }
}
const runner = new Parallel(2);

runner.jobs(
  () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
  () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
  () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
  () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
  () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
).then((results) => console.log(results)); // [1, 3, 2, 4, 5];
