
class Curring {

  public sum(a: number, b: number, c: number, d: number, e: number): number {
    return a + b + c + d + e;
  }

  public curry(sum: Function): any {
    const paramsQty = sum.length;

    return function curried (...args: number[]): any {
        if(args.length <= paramsQty) {
          return sum(args);
        }

        return (...rest: number[]) => curried(...args.concat(rest));
    }
  }
}
