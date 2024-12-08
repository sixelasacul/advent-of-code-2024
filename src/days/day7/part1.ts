function mult(first: number, second: number) {
  return first * second;
}
function add(first: number, second: number) {
  return first + second;
}

export function runPart1(input: string) {
  let total = 0;

  for (const [, _testValue, _operands] of input.matchAll(
    /(\d+):([\s\d]+)\n/gi
  )) {
    const testValue = Number(_testValue);
    const operands = _operands!.trim().split(/\s/);
    const possibilities = 2 ** operands.length - 1;
    let operators = 0;

    for (let i = 0; i < possibilities; i++) {
      let localTotal = Number(operands[0]);

      for (let j = 1; j < operands.length; j++) {
        // https://stackoverflow.com/questions/46303322/javascript-get-single-bit
        const operator = ((operators >> j) & 0x1) === 1 ? mult : add;
        const operand = Number(operands[j]);
        localTotal = operator(localTotal, operand);
      }

      if (localTotal === testValue) {
        total += localTotal;
        break;
      }

      operators++;
    }
  }

  return total;
}
