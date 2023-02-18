const sum = (initialValue?: number) => {
  let total = initialValue || 0;

  const add = (value: number) => {
    total += value;
    return add;
  };

  add.toString = () => total.toString();

  return add;
};

console.log(sum()); // output: 0
const s = sum();
console.log(s(1)); // output: 1
console.log(s(1)(2)); // output: 3
console.log(s(3)(4)(5)); // output: 12
const s3 = sum(3);
console.log(s3(5)); // output: 8
console.log(s3(6)); // output: 9
