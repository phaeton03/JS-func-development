function summator(): Function {
  let total: number = 0;


  function sum(a: number = 0): Function {
    total += a;

    function addToSum(b: number = 0): any {
      return sum(b);
    }

    addToSum.toString = () => {
      const result = total.toString();
      total = 0;
      return result;
    }

    return addToSum;
  }

  return sum;
}

const sum = summator();

alert(sum());



