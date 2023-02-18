function summator(initValue: number = 0): Function {
  let total: number = initValue;


  function sum(a: number = 0): Function {
    total += a;

    function addToSum(b: number = 0): any {
      return sum(b);
    }

    addToSum.toString = () => {
      const result = total.toString();
      return result;
    }

    return addToSum;
  }

  return sum;
}

const sum = summator();

alert(sum());



